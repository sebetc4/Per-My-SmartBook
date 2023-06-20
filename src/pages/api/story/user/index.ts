import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '~/apps/api/configs/db.config';

import { handleHttpError } from '~/apps/api/functions';
import { CustomError } from '~/packages/classes';
import { ReqMethods } from '~/packages/types';
import { getUserStoriesPreviewsAndSession } from '~/apps/api/controllers/story.controller';

export default async function userStoriestRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            await getUserStoriesPreviewsAndSession(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}