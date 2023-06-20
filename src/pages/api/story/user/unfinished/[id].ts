import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/apps/api/configs";
import { deleteUnfinishedStory } from "~/apps/api/controllers/story.controller";
import { handleHttpError } from "~/apps/api/functions";
import { CustomError } from "~/packages/classes";
import { ReqMethods } from "~/packages/types";


export default async function userUnfinishedStoryRouter (req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.DELETE:
            await deleteUnfinishedStory(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}