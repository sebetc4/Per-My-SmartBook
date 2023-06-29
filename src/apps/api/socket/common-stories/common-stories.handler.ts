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
import { enableCommonStoryDevMode } from '~/packages/constants';

export const handleCommonStoriesSocket = (io: Server) => {
    const commonStoriesIo = io.of(SocketNamespace.COMMON_STORIES);

    if (!enableCommonStoryDevMode) {
        schedule.scheduleJob('0 17 * * *', () => startNewStory(commonStoriesIo));
        schedule.scheduleJob('0 18 * * *', () => startNewStory(commonStoriesIo));
        schedule.scheduleJob('0 19 * * *', () => startNewStory(commonStoriesIo));
    }
      
    commonStoriesIo.on('connection', async (socket) => {
        logIfDevEnv('User connected on common stories socket');
        // startNewStory(commonStoriesIo)
        socket.on(SocketEvent.GET_ALL_COMMON_STORIES_BEING_GENERATED_PREVIEWS, (data, cb) => {
            getAllCommonStoriesBeingGeneratedPreviews(data, socket, commonStoriesIo, cb);
        });
        socket.on(SocketEvent.GET_COMMON_STORY_BEING_GENERATED_DATA, (data, cb) => {
            getCommonStoryBeingGeneratedData(data, socket, commonStoriesIo, cb);
        });
        socket.on(SocketEvent.SELECT_COMMON_STORY_CHAPTER_CHOICE, (data, cb) => {
            selectCommonStoryStoryChapterChoice(data, socket, commonStoriesIo, cb);
        });
        socket.on(SocketEvent.SEND_COMMON_STORY_CHAT_MESSAGE, (data, cb) => {
            sendNewMessage(data, socket, commonStoriesIo, cb);
        });
        socket.on(SocketEvent.START_COMMON_STORY, (data, cb) => {
            startNewStory(commonStoriesIo);
        });
    });
};
