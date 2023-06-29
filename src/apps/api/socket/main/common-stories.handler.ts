import { Server } from 'socket.io';
import schedule from 'node-schedule';

import { logIfDevEnv } from '../../../../packages/functions';
import { SocketEvent, SocketNamespace } from '../../../../packages/types';
import { getAllCommonStoriesBeingGeneratedPreviews, getCommonStoryBeingGeneratedData, selectCommonStoryStoryChapterChoice, startNewStory } from './common-stories.functions';

export const handleCommonStoriesSocket = (io: Server) => {
    const commonStoriesIo = io.of(SocketNamespace.COMMON_STORIES);

    schedule.scheduleJob('45 20 * * *', () => {
        console.log(new Date().toString());
    });

    commonStoriesIo.on('connection', async (socket) => {
        logIfDevEnv('User connected on common stories socket');
        // startNewStory(commonStoriesIo)
        socket.on(SocketEvent.GET_ALL_COMMON_STORIES_BEING_GENERATED_PREVIEWS, (data, cb) => {
            getAllCommonStoriesBeingGeneratedPreviews(data, socket, commonStoriesIo, cb);
        });

    });
};
