import type { NextApiRequest, NextApiResponse } from 'next';
import { dbConnect } from '~/apps/api/configs';
import { createOneReview, deleteOneReview, updateOneReview } from '~/apps/api/controllers';
import { handleHttpError } from '~/apps/api/functions';
import { CustomError } from '~/packages/classes';
import { ReqMethods } from '~/packages/types';

export default async function userStoriestRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.POST:
            await createOneReview(req, res);
            break;
        case ReqMethods.PUT:
            await updateOneReview(req, res);
            break;
        case ReqMethods.DELETE:
            await deleteOneReview(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}