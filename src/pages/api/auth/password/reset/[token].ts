import type { NextApiRequest, NextApiResponse } from 'next';
import { checkResetPasswordToken, resetPassword } from '~/apps/api/controllers';
import { handleHttpError } from '~/apps/api/functions';
import { CustomError } from '~/packages/classes';
import { ReqMethods } from '~/packages/types';

export default async function resetPasswordRouter(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case ReqMethods.GET:
            await checkResetPasswordToken(req, res);
            break;
        case ReqMethods.POST:
            await resetPassword(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
