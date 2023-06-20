import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { dbConnect, passport} from '../../../../apps/api/configs';
import { handleHttpError } from '../../../../apps/api/functions';
import { CustomError } from '../../../../packages/classes';
import { ReqMethods } from '../../../../packages/types';

export default async function googleAuthRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            passport.authenticate('google', {
                scope: ["profile", "email"],
                session: false,
            })(req, res);
            break
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
