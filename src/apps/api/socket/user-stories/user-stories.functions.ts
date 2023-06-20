import { IncomingMessage } from 'http';
import { Namespace, Socket } from 'socket.io';

import { CustomError } from '../../../../packages/classes';
import { capitalizeFirstLetter } from '../../../../packages/functions';
import {
    selectUserStoryOptionsSchema,
    selectUserStoryTopicSchema,
    selectUserStoryStoryChapterChoiceSchema,
    saveUserFinishedStorySchema,
    deleteUnfinishedStorySchema,
    resumeUserStorySchema,
} from '../../../../packages/schemas';
import { FinishedStory, UnfinishedStory } from '../../models';

import { getOneUnfinishedStoryById } from '../../queries';
import {
    catchSocketError,
    authUser,
    validSocketData,
    generateStorySummary,
    emitToOtherSocketsInRoom,
} from '../../functions';

import {
    SelectUserStoryOptionsBody,
    DeleteUnfinishedUserStoryBody,
    SaveFinishedUserStoryBody,
    SelectUserStoryStoryChapterChoiceBody,
    SelectUserStoryTopicBody,
    UnfinishedUserStoryInstance,
    ResumeUserStoryBody,
    SocketEvent,
    UserStoryStoryChapterChoiceIsSelectedRes,
} from '../../../../packages/types';

import { UserStoriesManagerRemoveStoryParams, userStoriesSocketManager } from './user-stories.manager';
import { handleUserStoryTopics } from './functions/user-stories-topics.functions';
import { handleUserStoryFirstChapter, handleUserStoryNextChapter } from './functions';

/**
 * Resume a story
 */
export const resumeUserStory = catchSocketError(async (data, socket, _, cb) => {
    const { storyId } = await validSocketData<ResumeUserStoryBody>(resumeUserStorySchema, data);
    const user = await authUser(socket.request as IncomingMessage);
    const story = await getOneUnfinishedStoryById(storyId);
    if (!story.isAuthor(user.id)) {
        throw CustomError.UNAUTHORIZED;
    }
    userStoriesSocketManager.resumeUserStory(story, socket);
    const storyData = await story.getData();
    cb({ story: storyData });
});

/**
 * Create new story and generate topics
 */
export const selectUserStoryOptions = catchSocketError(async (data, socket, _, cb) => {
    const { theme, style, duration, language } = await validSocketData<SelectUserStoryOptionsBody>(
        selectUserStoryOptionsSchema,
        data
    );
    const user = await authUser(socket.request as IncomingMessage);
    const userOpenaiSettings = user.aiSettings.openai;
    const story: UnfinishedUserStoryInstance = new UnfinishedStory({
        author: user.id,
        options: { theme, style, duration, language },
    });
    userStoriesSocketManager.addStory(story, true, socket);
    await handleUserStoryTopics({ story, userOpenaiSettings, socket });
    cb({ message: 'Generation completed' });
});

/**
 * Select a topic and generate first chapter
 */
export const selectUserStoryTopic = catchSocketError(async (data, socket, io, cb) => {
    const { selectedTopicIndex, storyId } = await validSocketData<SelectUserStoryTopicBody>(
        selectUserStoryTopicSchema,
        data
    );
    const user = await authUser(socket.request as IncomingMessage);
    const userOpenaiSettings = user.aiSettings.openai;
    const story = userStoriesSocketManager.getStoryInstance(storyId, user.id, true);
    
    await handleUserStoryFirstChapter({
        story,
        userOpenaiSettings,
        selectedTopicIndex,
        io,
    });
    cb({ message: 'Generation completed' });
});

/**
 * Select chapter choice and generate next chapter
 */
export const selectUserStoryStoryChapterChoice = catchSocketError(async (data, socket, io, cb) => {
    const { selectedChoiceIndex, storyId } = await validSocketData<SelectUserStoryStoryChapterChoiceBody>(
        selectUserStoryStoryChapterChoiceSchema,
        data
    );
    const user = await authUser(socket.request as IncomingMessage);
    const userOpenaiSettings = user.aiSettings.openai;
    const story = userStoriesSocketManager.getStoryInstance(storyId, user.id, true);

    const choiceIsSelectedData = { selectedChoiceIndex };
    emitToOtherSocketsInRoom<UserStoryStoryChapterChoiceIsSelectedRes>(
        SocketEvent.USER_STORY_CHAPTER_CHOICE_IS_SELECTED,
        socket,
        story.id,
        choiceIsSelectedData
    );

    await handleUserStoryNextChapter({
        story,
        selectedChoiceIndex,
        userOpenaiSettings,
        io,
    });

    emitToOtherSocketsInRoom<void>(SocketEvent.USER_STORY_CHAPTER_IS_GENERATED, socket, story.id);

    cb({ message: 'Generation completed' });
});

/**
 * Save finished story
 */
export const saveUserFinishedStory = catchSocketError(async (data, socket, io, cb) => {
    const { visibility, title, storyId } = await validSocketData<SaveFinishedUserStoryBody>(
        saveUserFinishedStorySchema,
        data
    );
    const user = await authUser(socket.request as IncomingMessage);
    const userId = user.id;
    const userOpenaiSettings = user.aiSettings.openai;
    const story = userStoriesSocketManager.getStoryInstance(storyId, userId, true);
    const { allChapters, options, topic, cover } = story;
    const finishedStory = await FinishedStory.create({
        type: 'user',
        author: userId,
        title: capitalizeFirstLetter(title),
        visibility,
        options,
        topic,
        summary: await generateStorySummary(allChapters, options.language, userOpenaiSettings),
        cover,
        allChapters,
    });
    await story.delete();
    const removeStoryParams: UserStoriesManagerRemoveStoryParams = {
        socket,
        disconnectOtherSockets: true,
        io,
        storyId: story.id,
    };
    userStoriesSocketManager.removeStory(removeStoryParams);
    cb({ storyId: finishedStory.id });
});

/**
 * Delete story
 */
export const deleteStory = catchSocketError(async (data, socket, io, cb) => {
    const user = await authUser(socket.request as IncomingMessage);
    const { storyId } = await validSocketData<DeleteUnfinishedUserStoryBody>(deleteUnfinishedStorySchema, data);
    const story = userStoriesSocketManager.getStoryInstance(storyId, user.id, false);
    const removeStoryParams: UserStoriesManagerRemoveStoryParams = {
        socket,
        disconnectOtherSockets: true,
        io,
        storyId: story.id,
    };
    userStoriesSocketManager.removeStory(removeStoryParams);
    cb({ message: 'Story is deleted' });
});

/**
 * Leave story room
 */
export const leaveStoryRoom = catchSocketError(async (_, socket, io, cb) => {
    disconnectSocketFromStoryRoom(socket, io);
    cb({ message: 'Room is leaved' });
});

/**
 * Deisconnect socket from story room
 */
export const disconnectSocketFromStoryRoom = async (socket: Socket, io: Namespace) => {
    const room = Array.from(socket.rooms)[1];
    if (room) {
        await userStoriesSocketManager.leaveRoom(room, io, socket);
    }
};
