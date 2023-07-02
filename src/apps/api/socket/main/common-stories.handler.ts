import { Server } from 'socket.io';

import { logIfDevEnv } from '../../../../packages/functions';
import { SocketEvent, SocketNamespace } from '../../../../packages/types';
import { getAllCommonStoriesBeingGeneratedPreviews} from './common-stories.functions';

export const handleCommonStoriesSocket = (io: Server) => {
    const commonStoriesIo = io.of(SocketNamespace.COMMON_STORIES);

    commonStoriesIo.on('connection', async (socket) => {
        logIfDevEnv('User connected on common stories socket');
        // startNewStory(commonStoriesIo)
        socket.on(SocketEvent.GET_ALL_COMMON_STORIES_BEING_GENERATED_PREVIEWS, (data, cb) => {
            getAllCommonStoriesBeingGeneratedPreviews(data, socket, commonStoriesIo, cb);
        });

    });
};
