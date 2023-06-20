import { NextApiResponse } from 'next';
import { ResStatus } from '../../../packages/types';

export const onSuccess = <T>(statusCode: number, data: T, res: NextApiResponse) => {
    res.status(statusCode).json({
        status: ResStatus.SUCCESS,
        ...data,
    });
}
