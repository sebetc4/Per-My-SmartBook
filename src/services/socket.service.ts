import io, { Socket } from 'socket.io-client';
import { enableLogSocketService } from '../packages/constants';
import { logIf } from '../packages/functions';
import { ResStatus, SocketEvent, SocketNamespace } from '../packages/types';

const baseURL = process.env.NEXT_PUBLIC_API_URL!;

type Sockets = {
    [key in SocketNamespace as string]: Socket | null;
};

class SocketService {
    sockets: Sockets;

    constructor() {
        this.sockets = {
            main: null,
            'user-stories': null,
            'common-stories': null,
        };
    }

    async mainConnect() {
        try {
            if (!this.sockets.main) {
                await fetch(`${baseURL}/socket`);
                this.sockets = {
                    main: io(),
                    'user-stories': io(`/${SocketNamespace.USER_STORIES}`),
                    'common-stories': io(`/${SocketNamespace.COMMON_STORIES}`),
                };
                this.sockets.main?.on('connect', () => {
                    logIf(enableLogSocketService, `Connected to sockets`);
                });
            }
        } catch (error) {
            throw new Error(`Failed to connect to sockets`);
        }
    }

    async connect(namespace: SocketNamespace) {
        this.sockets[namespace] = io(`/${namespace}`);
        this.sockets[namespace]?.on('connect', () => {
            logIf(enableLogSocketService, `Connected to ${namespace} socket`);
        });
    }

    mainDisconnect() {
        for (let socket in this.sockets) {
            this.sockets[socket]?.disconnect();
            this.sockets[socket] = null;
        }
    }

    async resetAllSockects() {
        this.mainDisconnect();
        await this.mainConnect()
    }

    disconnect(namespace: SocketNamespace) {
        this.sockets[namespace]?.disconnect();
        this.sockets[namespace] = null;
        logIf(enableLogSocketService, `${namespace} socket disconnected`);
    }

    emit<T>(namespace: SocketNamespace, event: SocketEvent, data?: T): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.sockets[namespace]) {
                return reject('No socket connection.');
            }
            return this.sockets[namespace]!.emit(event, data, (response: any) => {
                if (response.status === ResStatus.ERROR) {
                    return reject(response.message);
                }
                return resolve(response);
            });
        });
    }
    on<T>(namespace: SocketNamespace, event: SocketEvent, cb: (data: T) => void) {
        if (!this.sockets[namespace]) {
            throw new Error('No socket connection.');
        }

        this.sockets[namespace]!.on(event, cb);
    }

    off(namespace: SocketNamespace, event: SocketEvent) {
        this.sockets[namespace]?.off(event);
    }
}

export const sockets = new SocketService();
