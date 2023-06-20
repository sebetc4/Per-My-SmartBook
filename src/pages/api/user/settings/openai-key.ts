import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../apps/api/configs/db.config';
import { addModifyOpenaiKey, deleteOpenaiKey } from '../../../../apps/api/controllers/user.controller';
import { handleHttpError } from '../../../../apps/api/functions';
import { CustomError } from '../../../../packages/classes';
import { ReqMethods } from '../../../../packages/types';

export default async function userOpenaiKeyRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.POST:
            await addModifyOpenaiKey(req, res);
            break;
        case ReqMethods.DELETE:
            await deleteOpenaiKey(req, res);
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
