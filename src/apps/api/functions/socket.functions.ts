import { Namespace, Server, Socket } from 'socket.io';
import { SocketEvent } from '../../../packages/types';

export const emitToSocket = <T>(event: SocketEvent, socket: Socket, data?: T) => {
    socket.emit(event, data);
};

export const emitToOtherSocketsInRoom = <T>(event: SocketEvent, socket: Socket, room: string, data?: T) => {
    socket.to(room).emit(event, data);
};

export const emitToAllSocketsInRoom = <T>(event: SocketEvent, io: Namespace | Server, room: string, data?: T) => {
    io.to(room).emit(event, data);
};
