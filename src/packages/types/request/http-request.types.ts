import type { Server as HTTPServer } from 'http';
import { NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';
import type { Server as IOServer } from 'socket.io';
import { Session } from '..';


/**
 * Http Request
 */
export enum ReqMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum ResStatus {
    SUCCESS = 'sucess',
    ERROR = 'error',
}

export enum CookieName {
    TOKEN = 'token',
}

export type HttpResponse<T> = T & { status: ResStatus };


/**
 * Socket
 */
interface SocketServer extends HTTPServer {
    io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
    socket: SocketWithIO;
}

export type SocketResponse<T> = T & { status: ResStatus.SUCCESS };

export type SocketError = {
    status: ResStatus.ERROR
    message: string;
}

/**
 * Utils
 */
export type ResWithSession<T> = T & { session: Session };

