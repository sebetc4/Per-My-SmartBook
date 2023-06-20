import { NextApiRequest } from 'next';
import { Server } from 'socket.io';

import { logIfDevEnv } from '../../../packages/functions';
import { NextApiResponseWithSocket } from '../../../packages/types';
import { handleUserStoriesSocket, handleCommonStoriesSocket } from '../../../apps/api/socket';

export default async function socketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
    if (!res.socket.server.io) {
        logIfDevEnv('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
        io.on('connection', async (socket) => {
            logIfDevEnv('User connected on main socket');
        });

        handleCommonStoriesSocket(io);

        handleUserStoriesSocket(io);
    }
    res.end();
}
