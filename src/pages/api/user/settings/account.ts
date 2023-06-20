import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../apps/api/configs/db.config';
import { updateAccount } from '../../../../apps/api/controllers/user.controller';
import { handleHttpError } from '../../../../apps/api/functions';
import { CustomError } from '../../../../packages/classes';
import { ReqMethods } from '../../../../packages/types';

export default async function updateAccountRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.PUT:
            await updateAccount(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
