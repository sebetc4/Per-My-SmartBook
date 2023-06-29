import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "~/apps/api/configs";
import { toggleColorMode } from "~/apps/api/controllers";
import { handleHttpError } from "~/apps/api/functions";
import { CustomError } from "~/packages/classes";
import { ReqMethods } from "~/packages/types";

export default async function userOpenaiKeyRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.PUT:
            await toggleColorMode (req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}