import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '../../../../apps/api/configs/db.config';
import { updateAISettings, updateProfile } from '../../../../apps/api/controllers/user.controller';
import { handleHttpError } from '../../../../apps/api/functions';
import { CustomError } from '../../../../packages/classes';
import { ReqMethods } from '../../../../packages/types';

export default async function updateAISettingsRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.PUT:
            await updateAISettings(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}