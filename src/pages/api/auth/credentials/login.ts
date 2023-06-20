import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../apps/api/configs';
import { loginWithCredentials } from '../../../../apps/api/controllers';
import { handleHttpError } from '../../../../apps/api/functions';
import { CustomError } from '../../../../packages/classes';
import { ReqMethods } from '../../../../packages/types';

export default async function userRouter (req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.POST:
            await loginWithCredentials(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}