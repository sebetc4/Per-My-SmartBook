import { getCookie } from "cookies-next";
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { CustomError } from "../../../../packages/classes";
import { CookieName, Session, SessionStatus, UserInstance } from "../../../../packages/types";
import { User } from "../../models";
import { decodedToken, deleteTokenCookie } from "./cookie-auth.functions";

export const authUser = async (
    req: NextApiRequest | IncomingMessage,
    res?: NextApiResponse
): Promise<UserInstance> => {
    const cookie = getCookie(CookieName.TOKEN, { req });
    if (typeof cookie !== 'string') {
        throw CustomError.UNAUTHORIZED;
    }
    const { sub: userId } = decodedToken(cookie, req, res);
    const user: UserInstance | null = await User.findById(userId);
    if (!user) {
        res && deleteTokenCookie(req, res);
        throw CustomError.INVALID_TOKEN;
    }
    return user;
};

export const authUserAndSession = async (req: NextApiRequest, res: NextApiResponse) => {
    let session: Session = null;
    let user : UserInstance | null = null
    try {
        user = await authUser(req, res);
        const userSession = await user.getSessionData();
        session = {
            status: SessionStatus.VALID,
            user: userSession,
        };
    } catch (err) {
        if (err === CustomError.INVALID_TOKEN) {
            session = {
                status: SessionStatus.INVALID,
                user: null,
            };
        } else if (err !== CustomError.UNAUTHORIZED) {
            throw err;
        }
    }
    return { session, user };
};