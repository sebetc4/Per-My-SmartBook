import * as yup from 'yup';
import { maxTokensOpenai, minTokensOpenai } from '../constants';

import { AddModifyOpenaiKeyReq, UpdateAccountReq, UpdateAISettingsReq, UpdateProfileReq } from '../types';
import { emailValidation, usernameValidation } from './common.schemas';

const isValidOpenaiKey = (key: string | undefined): boolean => {
    if (key === undefined) {
        return false;
    }
    const keyFormat = /^sk-[a-zA-Z0-9]{48}$/;
    return keyFormat.test(key);
};

export const updateAccountSchema: yup.SchemaOf<UpdateAccountReq> = yup.object().shape({
    username: usernameValidation,
    email: emailValidation,
});

export const updateProfileSchema: yup.SchemaOf<UpdateProfileReq> = yup.object().shape({
    avatarFile: yup.mixed(),
});

export const updateAISettingsSchema: yup.SchemaOf<UpdateAISettingsReq> = yup.object().shape({
    maxTokens: yup.number().min(minTokensOpenai).max(maxTokensOpenai).required(),
    temperature: yup.number().min(0).max(1).required(),
});

export const addModifyOpenaiKeySchema: yup.SchemaOf<AddModifyOpenaiKeyReq> = yup.object().shape({
    key: yup.string().test('valid-openai-key', 'not-valid', isValidOpenaiKey).required('is-required'),
});
