import { NextApiRequest, NextApiResponse } from 'next';

import { dbConnect, passport} from '../../../../apps/api/configs';
import { handleHttpError } from '../../../../apps/api/functions';
import { CustomError } from '../../../../packages/classes';

import { ReqMethods, UserInstance } from '../../../../packages/types';

export default async function googleAuthCallback(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            passport.authenticate('google', (err: Error, user: UserInstance) => {
                if (err || !user) {
                    return res.redirect('/login?a=auth_fail');
                }
                user.login(req, res)
                res.redirect('/');
            })(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
