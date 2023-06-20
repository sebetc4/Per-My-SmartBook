import { Server } from 'socket.io';

import { logIfDevEnv } from '../../../../packages/functions';
import { SocketEvent, SocketNamespace } from '../../../../packages/types';
import {
    deleteStory,
    disconnectSocketFromStoryRoom,
    leaveStoryRoom,
    resumeUserStory,
    saveUserFinishedStory,
    selectUserStoryStoryChapterChoice,
    selectUserStoryOptions,
    selectUserStoryTopic,
} from './user-stories.functions';

export const handleUserStoriesSocket = (io: Server) => {

    const userStoriesIo = io.of(SocketNamespace.USER_STORIES);
    
    userStoriesIo.on('connection', async (socket) => {
        logIfDevEnv('User connected on user stories socket');
        socket.on(SocketEvent.RESUME_USER_STORY, (data, cb) => {
            resumeUserStory(data, socket, userStoriesIo, cb);
        });
        socket.on(SocketEvent.SELECT_USER_STORY_OPTIONS, (data, cb) => {
            selectUserStoryOptions(data, socket, userStoriesIo, cb);
        });
        socket.on(SocketEvent.SELECT_USER_STORY_TOPIC, (data, cb) => {
            selectUserStoryTopic(data, socket, userStoriesIo, cb);
        });
        socket.on(SocketEvent.SELECT_USER_STORY_CHAPTER_CHOICE, (data, cb) => {
            selectUserStoryStoryChapterChoice(data, socket, userStoriesIo, cb);
        });
        socket.on(SocketEvent.SAVE_FINISHED_USER_STORY, (data, cb) => {
            saveUserFinishedStory(data, socket, userStoriesIo, cb);
        });
        socket.on(SocketEvent.DELETE_USER_STORY, (data, cb) => {
            deleteStory(data, socket, userStoriesIo, cb);
        });
        socket.on(SocketEvent.LEAVE_USER_STORY_ROOM, (data, cb) => {
            leaveStoryRoom(data, socket, userStoriesIo, cb);
        });
        socket.on('disconnecting', () => {
            disconnectSocketFromStoryRoom(socket, userStoriesIo);
        });
        socket.on('disconnect', () => {
            logIfDevEnv('User disconnected from story socket');
            disconnectSocketFromStoryRoom(socket, userStoriesIo);
        });
    });
};
