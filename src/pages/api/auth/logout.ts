import type { NextApiRequest, NextApiResponse } from 'next';
import { logout } from '../../../apps/api/controllers';
import { handleHttpError } from '../../../apps/api/functions';
import { CustomError } from '../../../packages/classes';
import { ReqMethods } from '../../../packages/types';

export default async function logoutRouter (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case ReqMethods.GET:
            await logout(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}