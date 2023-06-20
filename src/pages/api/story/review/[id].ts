import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '~/apps/api/configs';
import { getOneStoryReview } from '~/apps/api/controllers/review.controller';
import { handleHttpError } from '~/apps/api/functions';
import { CustomError } from '~/packages/classes';
import { ReqMethods } from '~/packages/types';

export default async function propertyRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            await getOneStoryReview(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}