import { enableLogGeneratedData, imageGenerationIsEnable } from '../../../../../packages/constants';
import { logIf } from '../../../../../packages/functions';
import {
    CommonStoryTopic,
    CommonStoryTopicGenerated,
    CommonStoryTopicGeneratedEn,
    ImageDirectory,
    Language,
    StoryImageStyle,
    StoryOptions,
    Visibility,
} from '../../../../../packages/types';
import {
    generateImage,
    getPlaiceholderImageFromUrlAndUploadToS3,
    isValidCommonStoryTopicGenerated,
    isValidCommonStoryTopicGeneratedEn,
    parseAndValidData,
} from '../../../functions';
import { getCommonStoryTopicsTextPrompt, getStoryTopicImagePrompt } from '../../../prompts';
import { commonStoriesSocketManager } from '../common-stories.manager';

export const handleCommonStoryTopic = async (storyId: string, storyOptions: StoryOptions) => {
    const { theme, language, style } = storyOptions;
    const topicTextPrompt = getCommonStoryTopicsTextPrompt({ theme, language });

    const { text: topic, description } = await generateCommonStoryTopicData(topicTextPrompt, language);
    logIf(enableLogGeneratedData, { topic, description });

    commonStoriesSocketManager.addNewStory({
        id: storyId,
        options: storyOptions,
        topic,
        cover: imageGenerationIsEnable ? await generateCommonStoryTopicImage({ storyId, description, style }) : undefined,
        startAt: Date.now() + 1 * 60 * 1000,
    });
};

/**
 * Topic data
 */
const generateCommonStoryTopicData = async (textPrompt: string, language: Language): Promise<CommonStoryTopic> => {
    if (language === 'en') {
        const { topic } = await parseAndValidData<CommonStoryTopicGeneratedEn>(
            textPrompt,
            isValidCommonStoryTopicGeneratedEn,
            false
        );
        return {
            text: topic,
            description: topic,
        };
    } else {
        const { englishTopic: description, translatedTopic: text } = await parseAndValidData<CommonStoryTopicGenerated>(
            textPrompt,
            isValidCommonStoryTopicGenerated,
            false
        );
        return {
            text,
            description,
        };
    }
};

/**
 * Topic image
 */
type GenerateTopicParams = {
    storyId: string;
    description: string;
    style: StoryImageStyle;
};

const generateCommonStoryTopicImage = async ({ storyId, description, style }: GenerateTopicParams) => {
    const imageUrl = await generateImage(getStoryTopicImagePrompt(description, style), false);
    const fileKey = `${ImageDirectory.FINISHED_STORY}/${storyId}/cover`;
    const plaiceholder = await getPlaiceholderImageFromUrlAndUploadToS3(imageUrl, fileKey, Visibility.PUBLIC);
    return {
        key: fileKey,
        visibility: Visibility.PUBLIC,
        plaiceholder: plaiceholder!,
    };
};
