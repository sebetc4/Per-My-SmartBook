import { IncomingMessage } from 'http';
import { Namespace } from 'socket.io';
import { capitalizeFirstLetter } from '~/packages/functions';
import {
    getAllUnfinishedCommonStoriesPreviewsSchema,
    getCommonStoriesBeingGeneratedDataSchema,
    selectCommonStoryStoryChapterChoiceSchema,
    sendChatMessageCommonStorySchema,
} from '~/packages/schemas';
import {
    GetAllCommonStoriesBeingGeneratedPreviewsBody,
    GetCommonStoriesBeingGeneratedDataBody,
    SelectCommonStoryStoryChapterChoiceBody,
    SendCommonStoryChatMessageBody,
    SocketEvent,
} from '~/packages/types';
import { FinishedStory } from '../../models';
import {
    catchSocketError,
    validSocketData,
    authUser,
    generateStorySummaryAndTitle,
    emitToAllSocketsInRoom,
    emitToOtherSocketsInRoom,
} from '../../functions';
import { commonStoriesSocketManager } from './common-stories.manager';
import {
    handleFirstCommonStoryChapter,
    handleNextCommonStoryChapter,
    generateCommonStoryIdAndOptions,
    handleCommonStoryTopic,
} from './functions';
import { waitStartTime } from '~/packages/functions';

/**
 * Start a new story
 */
export const startNewStory = async (io: Namespace) => {
    const { storyId, storyOptions } = generateCommonStoryIdAndOptions();
    await handleCommonStoryTopic(storyId, storyOptions);

    let currentStoryStatus = await handleFirstCommonStoryChapter(storyId, io);

    while (currentStoryStatus.state === 'generating') {
        await waitStartTime(currentStoryStatus.nextChapterStartAt!);
        currentStoryStatus = await handleNextCommonStoryChapter(storyId, io);
    }

    const socketEvent =
        currentStoryStatus.state === 'stopped'
            ? SocketEvent.COMMON_STORY_IS_STOPPED
            : SocketEvent.COMMON_STORY_IS_FINISHED;
    emitToAllSocketsInRoom(socketEvent, io, storyId);

    currentStoryStatus.state === 'finished' && saveFinishedStory(storyId);
    /* commonStoriesSocketManager.deleteStory(storyId); */
};

/**
 * Save finished story
 */
const saveFinishedStory = async (storyId: string) => {
    const story = commonStoriesSocketManager.getStory(storyId);
    const { options, topic, cover, allChapters } = story;
    const { title, summary } = await generateStorySummaryAndTitle(story.allChapters, story.options.language);
    const finishedStory = await FinishedStory.create({
        type: 'common',
        title: capitalizeFirstLetter(title),
        visibility: 'public',
        options,
        topic,
        summary,
        cover,
        allChapters,
    });
    return finishedStory.id;
};

/**
 * Get all previews
 */
export const getAllCommonStoriesBeingGeneratedPreviews = catchSocketError(async (data, _, __, cb) => {
    const { language } = await validSocketData<GetAllCommonStoriesBeingGeneratedPreviewsBody>(
        getAllUnfinishedCommonStoriesPreviewsSchema,
        data
    );
    const allStoriesTopics = await commonStoriesSocketManager.getAllPreviews(language);
    cb({ allStoriesTopics });
});

/**
 * Get story data
 */
export const getCommonStoryBeingGeneratedData = catchSocketError(async (data, socket, _, cb) => {
    const { storyId } = await validSocketData<GetCommonStoriesBeingGeneratedDataBody>(
        getCommonStoriesBeingGeneratedDataSchema,
        data
    );
    const {storyData, allChatMessages} = await commonStoriesSocketManager.getStoryData(storyId);
    commonStoriesSocketManager.joinRoom(storyId, socket);
    cb({ storyData, allChatMessages });
});

/**
 * Select a chapter choice
 */
export const selectCommonStoryStoryChapterChoice = catchSocketError(async (data, socket, _, cb) => {
    const { storyId, selectedChoiceIndex } = await validSocketData<SelectCommonStoryStoryChapterChoiceBody>(
        selectCommonStoryStoryChapterChoiceSchema,
        data
    );
    const user = await authUser(socket.request as IncomingMessage);
    commonStoriesSocketManager.addOneStoryChapterChoiceVote(storyId, user.id, selectedChoiceIndex);
    cb({ message: 'Choice is selected' });
});

/**
 * Send message
 */
export const sendNewMessage = catchSocketError(async (data, socket, io, cb) => {
    const { storyId, message } = await validSocketData<SendCommonStoryChatMessageBody>(
        sendChatMessageCommonStorySchema,
        data
    );
    const user = await authUser(socket.request as IncomingMessage);
    const newMessage = commonStoriesSocketManager.addNewMessage(message, user, storyId);
    emitToOtherSocketsInRoom(SocketEvent.NEW_COMMON_STORY_CHAT_MESSAGE, socket, storyId, { message: newMessage });
    cb(newMessage);
});
