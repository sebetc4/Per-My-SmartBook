import { Socket } from 'socket.io';
import { imageGenerationIsEnable } from '../../../../../packages/constants';
import {
    OpenaiSettings,
    SocketEvent,
    StoryImageStyle,
    StoryOptions,
    UnfinishedUserStoryInstance,
    UserStoryTopic,
    UserStoryTopicsGenerated,
    UserStoryTopicsGeneratedEn,
} from '../../../../../packages/types';
import {
    emitToSocket,
    generateImage,
    isValidUserStoryTopicsGenerated,
    isValidUserStoryTopicsGeneratedEn,
    parseAndValidData,
} from '../../../functions';
import { getStoryTopicImagePrompt, getUserStoryTopicsTextPrompt } from '../../../prompts';
import { userStoriesSocketManager } from '../user-stories.manager';

/**
 * Handle topics
 */
type HandleTopicsDataParams = {
    story: UnfinishedUserStoryInstance;
    userOpenaiSettings: OpenaiSettings;
    socket: Socket;
};

export const handleUserStoryTopics = async ({ story, userOpenaiSettings, socket }: HandleTopicsDataParams) => {
    const allTopics = await generateTopicsData(story.options, userOpenaiSettings);

    emitToSocket(SocketEvent.USER_STORY_TOPICS_DATA, socket, { allTopics, storyId: story.id });

    story = updateStoryTopicsData(story, allTopics);

    imageGenerationIsEnable && (await handleTopicsImages({ story, userOpenaiSettings, socket }));
};

/**
 * Topics data
 */
const generateTopicsData = async (
    storyOptions: StoryOptions,
    userOpenaiSettings: OpenaiSettings
): Promise<UserStoryTopic[]> => {
    const { theme, language } = storyOptions;
    const topicsTextPrompt = getUserStoryTopicsTextPrompt({ theme, language });

    if (language === 'en') {
        const { allTopics } = await parseAndValidData<UserStoryTopicsGeneratedEn>(
            topicsTextPrompt,
            isValidUserStoryTopicsGeneratedEn,
            userOpenaiSettings
        );
        return allTopics.map((text, i) => ({
            text,
            description: text,
        }));
    } else {
        const { englishTopics: allDescriptions, translatedTopics: allTopics } =
            await parseAndValidData<UserStoryTopicsGenerated>(
                topicsTextPrompt,
                isValidUserStoryTopicsGenerated,
                userOpenaiSettings
            );
        return allTopics.map((text, i) => ({
            text,
            description: allDescriptions[i],
        }));
    }
};

const updateStoryTopicsData = (story: UnfinishedUserStoryInstance, allTopics: UserStoryTopic[]) => {
    story.state = 'selectTopic';
    story.allTopics = allTopics;
    userStoriesSocketManager.updateStory(story, imageGenerationIsEnable);
    return story;
};

/**
 * Topics images
 */
type HandleTopicsImagesParams = {
    story: UnfinishedUserStoryInstance;
    userOpenaiSettings: OpenaiSettings;
    socket: Socket;
};
const handleTopicsImages = async ({ story, userOpenaiSettings, socket }: HandleTopicsImagesParams) => {
    const { allTopics, options } = story;

    const allImagesUrl = await generateStoryTopicsImages({
        allTopics: allTopics!,
        style: options.style,
        userOpenaiSettings,
    });

    emitToSocket(SocketEvent.USER_STORY_TOPICS_IMAGES, socket, { allImagesUrl });

    allTopics!.forEach((topic, i) => (topic.imageUrl = allImagesUrl[i]));
    userStoriesSocketManager.updateStory(story, false);
};

type GenerateStoryTopicsImagesParams = {
    allTopics: UserStoryTopic[];
    style: StoryImageStyle;
    userOpenaiSettings: OpenaiSettings | false;
};

const generateStoryTopicsImages = async ({ allTopics, style, userOpenaiSettings }: GenerateStoryTopicsImagesParams) => {
    const allPromises: Promise<string>[] = [];
    allTopics.forEach((topic) =>
        allPromises.push(generateImage(getStoryTopicImagePrompt(topic.description, style), userOpenaiSettings))
    );
    return await Promise.all(allPromises);
};
