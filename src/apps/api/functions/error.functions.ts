import { NextApiRequest, NextApiResponse } from 'next';
import { Namespace, Socket } from 'socket.io';
import { CustomError, CustomHttpError } from '../../../packages/classes';
import { logIfDevEnv } from '../../../packages/functions';

export const catchControllerError =
    (func: (req: NextApiRequest, res: NextApiResponse) => void) => (req: NextApiRequest, res: NextApiResponse) =>
        Promise.resolve(func(req, res)).catch((err) => handleHttpError(err, res));

export const handleHttpError = (err: Error | CustomError, res: NextApiResponse) => {
    const error = new CustomHttpError(err);
    let statusCode: number;
    if (!(err instanceof Error)) {
        statusCode = err.statusCode;
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
    } else {
        statusCode = 500;
    }
    res.status(statusCode).json(error);
};

export const catchSocketError =
    (func: (data: unknown, socket: Socket, io: Namespace, cb: (response: any) => void) => void) =>
    (data: unknown, socket: Socket, io: Namespace, cb: (response: any) => void) =>
        Promise.resolve(func(data, socket, io, cb)).catch((err) => handleSocketError(err, cb));

export const handleSocketError = (err: Error | CustomError, cb: (response: any) => void) => {
    const error = new CustomHttpError(err);
    logIfDevEnv(error);
    cb(error);
};

export const handleOpenaiError = (err: any) => {
    if (!err?.response?.data) {
        throw err;
    }
    switch (err.response.status) {
        case 503:
            throw CustomError.OPENAI_SERVICE_UNVAILABLE;
        case 401:
            throw CustomError.OPENAI_UNAUTHORIZED;
        case 429:
            throw CustomError.OPENAI_NO_CREDIT;
        default:
            throw err;
    }
};
