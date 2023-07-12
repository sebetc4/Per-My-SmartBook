import { Namespace } from 'socket.io';
import { StoryDurationClass } from '~/packages/classes';
import {
    commonStoryChapterDurationSeconds,
    enableLogCommonStoriesSocketManager,
    enableLogGeneratedData,
    imageGenerationIsEnable,
    minutesBeforeCommonStoryDelete,
    stopCommonStoryIfNoVoters,
} from '~/packages/constants';
import { logIf, minutesToMilliseconds, waitStartTime } from '~/packages/functions';
import {
    CommonStoryBeingGenerated,
    CommonStoryChapter,
    CommonStoryStoryChapterChoiceAndAllNumbOfVotesRes,
    CommonStoryChapterDataRes,
    CurrentStoryStatus,
    Language,
    SocketEvent,
    StoryTheme,
    StoryImageStyle,
    ImageDirectory,
    Visibility,
    FirstCommonStoryChapterRes,
    StoryChapterChoice,
} from '~/packages/types';
import { getUrlFromS3 } from '../../../configs';
import {
    emitToAllSocketsInRoom,
    generateImage,
    getPlaiceholderImageFromUrlAndUploadToS3,
    generateNextStoryChapterData,
    generateFinalStoryChapterData,
    generateFirstStoryChapterData,
} from '../../../functions';
import {
    getStoryFinalChapterTextPrompt,
    getStoryFirstChapterTextPrompt,
    getStoryNextChapterTextPrompt,
    getUserStoryChapterImagePrompt,
} from '../../../prompts';
import { commonStoriesSocketManager } from '../common-stories.manager';

/**
 * First chapter
 */
export const handleFirstCommonStoryChapter = async (storyId: string, io: Namespace): Promise<CurrentStoryStatus> => {
    let story = commonStoriesSocketManager.getStory(storyId);
    const { topic, options } = story;
    const { theme, language, style } = options;

    const chapter = await generateCommonStoryFirstChapterData({ theme, topic, language });

    const { imageOnDb, imageOnClient } = await handleCommonStoryFirstChapterImage({
        storyId,
        style,
        description: chapter.description,
    });

    await waitStartTime(story.startAt);

    story = updateCommonStoryWithChapterData({
        story,
        chapter: {
            ...chapter,
            image: imageOnDb,
        },
        isEnd: false,
    });

    const firstChapter: FirstCommonStoryChapterRes = {
        chapter: {
            ...chapter,
            image: imageOnClient,
            endAt: story.allChapters[0].endAt,
        },
    };

    emitToAllSocketsInRoom<FirstCommonStoryChapterRes>(
        SocketEvent.FIRST_COMMON_STORY_CHAPTER,
        io,
        storyId,
        firstChapter
    );

    return { nextChapterStartAt: story.allChapters[0].endAt!, state: story.state };
};

/**
 * Next chapter
 */
export const handleNextCommonStoryChapter = async (storyId: string, io: Namespace): Promise<CurrentStoryStatus> => {
    let story = commonStoriesSocketManager.getStoryAndCloseVotes(storyId);
    const allChoices = story.allChapters.at(-1)!.allChoices!;
    const chapterChoiceIndex = determineAndSendCommonStoryChapterChoice({
        storyId,
        allChoices,
        io,
    });

    story = updateCommonStoryWithChapterChoice(story, chapterChoiceIndex);

    if (story.state === 'stopped') {
        logIf(enableLogCommonStoriesSocketManager, 'Story is stopped because no voters');
        const storyDeletedAt = Date.now() + minutesToMilliseconds(minutesBeforeCommonStoryDelete);
        story.state = 'stopped';
        story.deletedAt = storyDeletedAt
        commonStoriesSocketManager.updateStory(story);
        return { nextChapterStartAt: 0, state: 'stopped', storyDeletedAt };
    }

    const { generatedChapter: chapter, isEnd } = await generateCommonStoryNextChapterData(story);

    story = updateCommonStoryWithChapterData({ story, chapter, isEnd });
    const { options, currentStep, allChapters } = story;
    const chapterIndex = currentStep - 1;

    const chapterData: CommonStoryChapterDataRes = {
        chapterIndex,
        chapter: {
            ...chapter,
            endAt: story.allChapters[chapterIndex].endAt!,
        },
        isEnd,
    };
    emitChapterData({ chapterData, storyId, io });

    imageGenerationIsEnable &&
        handleCommonStoryNextChapterImage({
            chapterIndex: story.currentStep - 1,
            description: chapter.description,
            style: options.style,
            io,
            story,
        });
    return { nextChapterStartAt: allChapters[chapterIndex].endAt!, state: story.state, storyDeletedAt: story.deletedAt };
};

/**
 * Generate chapter data
 */
type GenerateFirstChapterDataParams = {
    theme: StoryTheme;
    topic: string;
    language: Language;
};

const generateCommonStoryFirstChapterData = async (generateFirstChapterDataParams: GenerateFirstChapterDataParams) => {
    const chapterTextPrompt = getStoryFirstChapterTextPrompt(generateFirstChapterDataParams);
    const generatedChapter = await generateFirstStoryChapterData(chapterTextPrompt, false);
    logIf(enableLogGeneratedData, { generatedChapter });
    return generatedChapter;
};

const generateCommonStoryNextChapterData = async (story: CommonStoryBeingGenerated) => {
    const { allChapters, options, currentStep } = story;
    const { selectedChoiceIndex, allChoices } = story.allChapters.at(-1)!;

    const isEnd = StoryDurationClass.isEnd(options.duration!, currentStep);
    const chapterTextPromptParams = {
        theme: options.theme!,
        duration: options.duration!,
        currentStep,
        storySummary: allChapters.at(-1)!.summary!,
        choice: allChoices![selectedChoiceIndex!].text,
        language: options.language,
    };
    const chapterTextPrompt = !isEnd
        ? getStoryNextChapterTextPrompt(chapterTextPromptParams)
        : getStoryFinalChapterTextPrompt(chapterTextPromptParams);

    const generatedChapter = !isEnd
        ? await generateNextStoryChapterData(chapterTextPrompt, false)
        : await generateFinalStoryChapterData(chapterTextPrompt, false);

    logIf(enableLogGeneratedData, { generatedChapter });

    return { generatedChapter, isEnd };
};

/**
 * Determine and send chapter choice
 */
type DetermineAndSendStoryChapterChoiceParams = {
    storyId: string;
    allChoices: StoryChapterChoice[];
    io: Namespace;
};

const determineAndSendCommonStoryChapterChoice = ({
    storyId,
    allChoices,
    io,
}: DetermineAndSendStoryChapterChoiceParams): number => {
    const selectedChoiceIndex = determineCommonStoryChapterChoice(allChoices);

    if (selectedChoiceIndex !== -1) {
        logIf(enableLogCommonStoriesSocketManager, `Chapter choice selected is : ${selectedChoiceIndex}`);
        const chapterChoiceAndAllNumbOfVotes = {
            selectedChoiceIndex,
            allNumbOfVotes: allChoices!.map((choice) => choice.numbOfVotes!),
        };
        emitToAllSocketsInRoom<CommonStoryStoryChapterChoiceAndAllNumbOfVotesRes>(
            SocketEvent.COMMON_STORY_CHAPTER_CHOICE_AND_ALL_NUMB_OF_VOTES,
            io,
            storyId,
            chapterChoiceAndAllNumbOfVotes
        );
    }
    return selectedChoiceIndex;
};

const determineCommonStoryChapterChoice = (allChoices: StoryChapterChoice[]) => {
    const allNumbOfVotes = allChoices.map((choice) => choice.numbOfVotes!);
    const maxNumbOfVotes = Math.max(...allNumbOfVotes);
    if (maxNumbOfVotes === 0 && stopCommonStoryIfNoVoters) {
        return -1;
    }
    const allMaxNumbOfVotes: number[] = [];
    allNumbOfVotes.forEach((numbOfVotes, index) => {
        if (numbOfVotes === maxNumbOfVotes) {
            allMaxNumbOfVotes.push(index);
        }
    });
    if (allMaxNumbOfVotes.length > 1) {
        const randomChoice = Math.round(Math.random() * (allMaxNumbOfVotes.length - 1));
        return allMaxNumbOfVotes[randomChoice];
    } else {
        return allMaxNumbOfVotes[0];
    }
};

/**
 * Update story with next chapter
 */
type UpdateChapterDataOnManagerParams = {
    story: CommonStoryBeingGenerated;
    chapter: Omit<CommonStoryChapter, 'endAt' | 'voters'>;
    isEnd: boolean;
};

const updateCommonStoryWithChapterData = ({
    story,
    chapter: chapterWithoutVotes,
    isEnd,
}: UpdateChapterDataOnManagerParams) => {
    const chapter = isEnd ? chapterWithoutVotes : addInitalChapterVotesValuesAndEndTime(chapterWithoutVotes);
    story.allChapters = [...story.allChapters, chapter];
    story.state = isEnd ? 'finished' : 'generating';
    story.currentStep++;
    story.votesAreOpen = !isEnd;
    story.deletedAt = isEnd ? Date.now() + minutesToMilliseconds(minutesBeforeCommonStoryDelete) : undefined
    commonStoriesSocketManager.updateStory(story);
    return story;
};

const addInitalChapterVotesValuesAndEndTime = (chapterWithoutVotes: Omit<CommonStoryChapter, 'endAt' | 'voters'>) => {
    const allChoicesWithNumbOfVotes = chapterWithoutVotes.allChoices!.map((choice) => ({
        ...choice,
        numbOfVotes: 0,
    }));
    const chapter: CommonStoryChapter = {
        ...chapterWithoutVotes,
        allChoices: allChoicesWithNumbOfVotes,
        voters: [],
        endAt: Date.now() + commonStoryChapterDurationSeconds * 1000,
    };
    return chapter;
};

const updateCommonStoryWithChapterChoice = (story: CommonStoryBeingGenerated, selectedChoiceIndex: number) => {
    if (selectedChoiceIndex === -1) {
        story.state = 'stopped';
    } else {
        story.allChapters.at(-1)!.selectedChoiceIndex = selectedChoiceIndex;
    }
    commonStoriesSocketManager.updateStory(story);
    return story;
};

/**
 * Emit chapter data
 */
type EmitChapterDataParams = {
    chapterData: CommonStoryChapterDataRes;
    storyId: string;
    io: Namespace;
};

const emitChapterData = ({ chapterData, storyId, io }: EmitChapterDataParams) => {
    emitToAllSocketsInRoom<CommonStoryChapterDataRes>(SocketEvent.COMMON_STORY_CHAPTER_DATA, io, storyId, chapterData);
};

/**
 * First chapter image
 */
type HandleFirstChapterImageParams = {
    storyId: string;
    style: StoryImageStyle;
    description: string;
};

const handleCommonStoryFirstChapterImage = async ({ storyId, style, description }: HandleFirstChapterImageParams) => {
    const imageUrl = imageGenerationIsEnable
        ? await generateImage(getUserStoryChapterImagePrompt(description, style), false)
        : undefined;
    const imageOnDb = imageUrl
        ? await saveChapterImageOnS3({
              imageUrl,
              storyId,
              chapterIndex: 0,
          })
        : undefined;
    const imageOnClient = imageOnDb
        ? { url: await getUrlFromS3(imageOnDb), plaiceholder: imageOnDb.plaiceholder }
        : undefined;
    return { imageOnDb, imageOnClient };
};

/**
 * Next chapter image
 */
type HandleNextChapterImageParams = {
    chapterIndex: number;
    description: string;
    style: StoryImageStyle;
    io: Namespace;
    story: CommonStoryBeingGenerated;
};

const handleCommonStoryNextChapterImage = async ({
    chapterIndex,
    description,
    style,
    io,
    story,
}: HandleNextChapterImageParams) => {
    const storyId = story.id;
    const imageUrl = await generateImage(getUserStoryChapterImagePrompt(description, style), false);
    const chapterImage = {
        imageUrl,
        chapterIndex,
    };
    emitToAllSocketsInRoom(SocketEvent.COMMON_STORY_CHAPTER_IMAGE, io, storyId, chapterImage);
    story.allChapters[chapterIndex].image = await saveChapterImageOnS3({ storyId, chapterIndex, imageUrl });
    commonStoriesSocketManager.updateStory(story);
};

/**
 * Save chapter image on S3 and return story with updated chapter image
 */
type SaveChapterImageOnS3Params = {
    storyId: string;
    imageUrl: string;
    chapterIndex: number;
};

const saveChapterImageOnS3 = async ({ storyId, chapterIndex, imageUrl }: SaveChapterImageOnS3Params) => {
    const fileKey = `${ImageDirectory.FINISHED_STORY}/${storyId}/chapter${chapterIndex + 1}`;
    const plaiceholder = await getPlaiceholderImageFromUrlAndUploadToS3(imageUrl, fileKey, Visibility.PUBLIC);
    return {
        key: fileKey,
        visibility: Visibility.PUBLIC,
        plaiceholder: plaiceholder!,
    };
};
