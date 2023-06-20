import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CustomError } from '../../../packages/classes';
import { setAlert } from '../../../store';

export const handleOpenAIErrorOnStore = (
    err: any,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
    defaultErrorMessage: string
) => {
    let message = defaultErrorMessage;
    if (typeof err === 'string') {
        switch (err) {
            case CustomError.OPENAI_UNAUTHORIZED.message:
                throw err;
            case CustomError.OPENAI_NO_CREDIT.message:
                throw err;
            case CustomError.OPENAI_NO_KEY.message:
                throw err;
            case CustomError.OPENAI_SERVICE_UNVAILABLE.message:
                message = 'error.openai-service-unavailable';
        }
    }
    dispatch(setAlert({ type: 'error', message }));
    throw err;
};
