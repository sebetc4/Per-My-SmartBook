import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { deleteCookie, setCookie } from 'cookies-next';
import { IncomingMessage } from 'http';
import { ObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { CustomError } from '../../../../packages/classes';
import { CookieName } from '../../../../packages/types';

const tokenSecret = process.env.TOKEN_SECRET!;
const tokenTimeLife = +process.env.TOKEN_TIME_LIFE!;

export const decodedToken = (token: string, req: NextApiRequest | IncomingMessage, res?: NextApiResponse) => {
    try {
        const decoded = jwt.verify(token, tokenSecret);
        return decoded
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            res && deleteTokenCookie(req, res);
            throw CustomError.INVALID_TOKEN;
        } else {
            throw error;
        }
    }
};

export const deleteTokenCookie = (req: NextApiRequest | IncomingMessage, res: NextApiResponse) => {
    deleteCookie(CookieName.TOKEN, { req, res });
};

export const setTokenCookie = (userId: ObjectId, req: NextApiRequest, res: NextApiResponse) => {
    const token = jwt.sign({ sub: userId }, tokenSecret, { expiresIn: tokenTimeLife });
    setCookie('token', token, { req, res, httpOnly: true, maxAge: tokenTimeLife });
};
