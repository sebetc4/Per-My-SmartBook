import { Namespace } from 'socket.io';
import { StoryDurationClass } from '~/packages/classes';
import { imageGenerationIsEnable } from '~/packages/constants';
import {
    CommonStoryBeingGenerated,
    ImageDirectory,
    ImageOnDb,
    OpenaiSettings,
    SocketEvent,
    StoryOptions,
    UnfinishedUserStoryInstance,
    UserStoryChapter,
    Visibility,
} from '../../../../../packages/types';
import {
    emitToAllSocketsInRoom,
    generateFinalStoryChapterData,
    generateFirstStoryChapterData,
    generateImage,
    generateNextStoryChapterData,
    getPlaiceholderImageFromUrlAndUploadToS3,
} from '../../../functions';
import {
    getStoryFirstChapterTextPrompt,
    getStoryFinalChapterTextPrompt,
    getStoryNextChapterTextPrompt,
    getUserStoryChapterImagePrompt,
} from '../../../prompts';
import { userStoriesSocketManager } from '../user-stories.manager';

/**
 * First chapter
 */
type HandleUserStoryFirstChapterParams = {
    story: UnfinishedUserStoryInstance;
    selectedTopicIndex: number;
    userOpenaiSettings: OpenaiSettings;
    io: Namespace;
};

export const handleUserStoryFirstChapter = async ({
    story,
    selectedTopicIndex,
    userOpenaiSettings,
    io,
}: HandleUserStoryFirstChapterParams) => {

    const { options, allTopics } = story;
    const { text: topic, imageUrl: coverUrl } = allTopics?.[selectedTopicIndex]!;

    const chapter = await generateFirstChapterData({ options, topic, userOpenaiSettings });

    story = updateStoryWithFirstChapterData({
        story,
        topic,
        chapter,
    });

    emitChapterData({
        storyId: story.id,
        chapter,
        chapterIndex: 0,
        isEnd: false,
        io,
    });
    if (imageGenerationIsEnable) {
        const chapterImage = await handleChapterImage({
            story,
            chapterIndex: 0,
            userOpenaiSettings,
            directory: ImageDirectory.UNFINISHED_STORY,
            visibility: Visibility.PUBLIC,
            io,
        });
        story.allChapters.at(-1)!.image = chapterImage;
        if (coverUrl) {
            story.cover = await saveCoverImage(story, coverUrl);
        }
        userStoriesSocketManager.updateStory(story, false);
    }
    story.save();
};

type HandleUserStoryNextChapter = {
    story: UnfinishedUserStoryInstance;
    selectedChoiceIndex: number;
    userOpenaiSettings: OpenaiSettings;
    io: Namespace;
};

/**
 * Next chapter
 */
export const handleUserStoryNextChapter = async ({
    story,
    selectedChoiceIndex,
    userOpenaiSettings,
    io,
}: HandleUserStoryNextChapter) => {
    const { options, currentStep: chapterIndex } = story;
    const isEnd = StoryDurationClass.isEnd(options.duration!, chapterIndex);

    const chapter = await generateNextChapterData({
        story,
        selectedChoiceIndex,
        isEnd,
        userOpenaiSettings,
    });

    story = updateStoryWithNextChapterData({ story, chapter, isEnd, selectedChoiceIndex });

    emitChapterData({
        storyId: story.id,
        chapterIndex,
        chapter,
        isEnd,
        io,
    });

    if (imageGenerationIsEnable) {
        const chapterImage = await handleChapterImage({
            story,
            chapterIndex,
            userOpenaiSettings,
            directory: ImageDirectory.UNFINISHED_STORY,
            visibility: Visibility.PUBLIC,
            io,
        });
        story.allChapters.at(chapterIndex)!.image = chapterImage;
        userStoriesSocketManager.updateStory(story, false);
    }

    await story.save();
};

/**
 * Generate chapter data
 */
type GenerateFirstChapterdataParams = {
    options: StoryOptions;
    topic: string;
    userOpenaiSettings: OpenaiSettings;
};

const generateFirstChapterData = async ({ options, topic, userOpenaiSettings }: GenerateFirstChapterdataParams) => {
    const firstChapterTextPrompt = getStoryFirstChapterTextPrompt({
        theme: options.theme!,
        topic,
        language: options.language,
    });

    const chapter = await generateFirstStoryChapterData(firstChapterTextPrompt, userOpenaiSettings);
    return chapter;
};

type GenerateNextChapterDataParams = {
    story: UnfinishedUserStoryInstance;
    selectedChoiceIndex: number;
    isEnd: boolean;
    userOpenaiSettings: OpenaiSettings;
};

const generateNextChapterData = async ({
    story,
    selectedChoiceIndex,
    isEnd,
    userOpenaiSettings,
}: GenerateNextChapterDataParams) => {
    const { options, allChapters, currentStep } = story;
    const { theme, duration, language } = options;
    const FinalChapter = allChapters.at(-1)!;
    
    const chapterTextPromptParams = {
        theme,
        duration,
        currentStep,
        storySummary: FinalChapter.summary!,
        choice: FinalChapter.allChoices![selectedChoiceIndex].text,
        selectedChoiceIndex,
        language,
    };
    const chapterTextPrompt = !isEnd
        ? getStoryNextChapterTextPrompt(chapterTextPromptParams)
        : getStoryFinalChapterTextPrompt(chapterTextPromptParams);

    return !isEnd
        ? await generateNextStoryChapterData(chapterTextPrompt, userOpenaiSettings)
        : await generateFinalStoryChapterData(chapterTextPrompt, userOpenaiSettings);
};

/**
 * Chapter image
 */
export type HandleChapterImagesParams = {
    story: UnfinishedUserStoryInstance | CommonStoryBeingGenerated;
    chapterIndex: number;
    userOpenaiSettings: OpenaiSettings | false;
    directory: ImageDirectory;
    visibility: Visibility;
    io: Namespace;
};

export const handleChapterImage = async ({
    story,
    chapterIndex,
    userOpenaiSettings,
    io,
}: HandleChapterImagesParams) => {
    const description = story.allChapters[chapterIndex]!.description;
    const style = story.options.style;
    const imageUrl = await generateImage(getUserStoryChapterImagePrompt(description, style), userOpenaiSettings);

    emitToAllSocketsInRoom(SocketEvent.USER_STORY_CHAPTER_IMAGE, io, story.id, { chapterIndex, imageUrl });

    const fileKey = `${ImageDirectory.UNFINISHED_STORY}/${story.id}/chapter${story.currentStep}`;
    const plaiceholder = await getPlaiceholderImageFromUrlAndUploadToS3(imageUrl, fileKey, Visibility.PRIVATE);
    return {
        key: fileKey,
        visibility: Visibility.PRIVATE,
        plaiceholder: plaiceholder!,
    };
};

/**
 * Save cover image
 */
const saveCoverImage = async (story: UnfinishedUserStoryInstance, coverUrl: string): Promise<ImageOnDb> => {
    const fileKey = `unfinished-story/${story.id}/cover`;
    const plaiceholder = await getPlaiceholderImageFromUrlAndUploadToS3(coverUrl, fileKey, Visibility.PRIVATE);
    return {
        key: fileKey,
        visibility: Visibility.PRIVATE,
        plaiceholder: plaiceholder!,
    };
};

/**
 * Update story
 */
type UpdateStoryWithFirstChapterParams = {
    story: UnfinishedUserStoryInstance;
    chapter: UserStoryChapter;
    topic: string;
};
const updateStoryWithFirstChapterData = ({ story, chapter, topic }: UpdateStoryWithFirstChapterParams) => {
    story.state = 'generating';
    story.currentStep++;
    story.allTopics = undefined;
    story.topic = topic;
    story.allChapters = [chapter];
    userStoriesSocketManager.updateStory(story, imageGenerationIsEnable);
    return story;
};

type UpdateStoryWithNextChapterParams = {
    story: UnfinishedUserStoryInstance;
    chapter: UserStoryChapter;
    selectedChoiceIndex: number;
    isEnd: boolean;
};
const updateStoryWithNextChapterData = ({
    story,
    chapter,
    isEnd,
    selectedChoiceIndex,
}: UpdateStoryWithNextChapterParams) => {
    story.state = isEnd ? 'finished' : 'generating';
    story.currentStep++;
    story.allChapters.at(-1)!.selectedChoiceIndex = selectedChoiceIndex;
    story.allChapters = [...story.allChapters, chapter];
    userStoriesSocketManager.updateStory(story, imageGenerationIsEnable);
    return story;
};

/**
 * Emit data
 */
type EmitChapterData = {
    storyId: string;
    chapter: UserStoryChapter;
    chapterIndex: number;
    isEnd: boolean;
    io: Namespace;
};
const emitChapterData = ({ storyId, chapter, chapterIndex, isEnd, io }: EmitChapterData) => {
    const chapterData = {
        storyId,
        chapterIndex,
        chapter,
        isEnd,
    };
    emitToAllSocketsInRoom(SocketEvent.USER_STORY_CHAPTER_DATA, io, storyId, chapterData);
};
