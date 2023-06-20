import { Server } from 'socket.io';
import schedule from 'node-schedule';

import { logIfDevEnv } from '../../../../packages/functions';
import { SocketEvent, SocketNamespace } from '../../../../packages/types';
import {
    getAllCommonStoriesBeingGeneratedPreviews,
    getCommonStoryBeingGeneratedData,
    selectCommonStoryStoryChapterChoice,
    sendNewMessage,
    startNewStory,
} from './common-stories.functions';

export const handleCommonStoriesSocket = (io: Server) => {
    const commonStoriesIo = io.of(SocketNamespace.COMMON_STORIES);

    schedule.scheduleJob('45 20 * * *', () => {
        console.log(new Date().toString());
    });

    commonStoriesIo.on('connection', async (socket) => {
        logIfDevEnv('User connected on common stories socket');
        // startNewStory(commonStoriesIo)
        socket.on(SocketEvent.GET_ALL_COMMON_STORIES_BEINGGENERATED_PREVIEWS, (data, cb) => {
            getAllCommonStoriesBeingGeneratedPreviews(data, socket, commonStoriesIo, cb);
        });
        socket.on(SocketEvent.GET_COMMON_STORY_BEINGGENERATED_DATA, (data, cb) => {
            getCommonStoryBeingGeneratedData(data, socket, commonStoriesIo, cb);
        });
        socket.on(SocketEvent.SELECT_COMMON_STORY_CHAPTER_CHOICE, (data, cb) => {
            selectCommonStoryStoryChapterChoice(data, socket, commonStoriesIo, cb);
        });
        socket.on(SocketEvent.SEND_CHAT_MESSAGE, (data, cb) => {
            sendNewMessage(data, socket, commonStoriesIo, cb);
        });
        socket.on(SocketEvent.START_COMMON_STORY, (data, cb) => {
            startNewStory(commonStoriesIo);
        });
    });
};
