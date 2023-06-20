import formidable from "formidable";
import IncomingForm from "formidable/Formidable";
import { IncomingMessage } from "http";
import { isObjectIdOrHexString } from "mongoose";
import { NextApiRequest } from "next";
import { ObjectSchema } from "yup";
import { CustomError } from "../../../../packages/classes";

export const validBody = async <T>(schema: ObjectSchema<any>, req: NextApiRequest): Promise<T> => {
    await schema.validate(req.body);
    return req.body as T;
};

export const validSocketData = async <T>(schema: ObjectSchema<any>, data: unknown): Promise<T> => {
    await schema.validate(data);
    return data as T;
};

export const validQueryId = (req: NextApiRequest) => {
    if (!isObjectIdOrHexString(req.query.id)) {
        throw CustomError.INVALID_ID;
    }
    return req.query.id as string;
};

export const validQueryData = async <T>(schema: ObjectSchema<any>, req: NextApiRequest): Promise<T> => {
    await schema.validate(req.query);
    return req.query as T;
};

const parseFormidableData = async (
    form: IncomingForm,
    req: IncomingMessage
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return await new Promise(async (resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
};

export const validParseFormidableData = async <T>(
    schema: ObjectSchema<any>,
    req: IncomingMessage,
    options?: formidable.Options
) => {
    const form = formidable(options);
    const { fields, files } = await parseFormidableData(form, req);
    await schema.validate({ ...fields, ...files });
    return { ...fields, ...files } as T;
};