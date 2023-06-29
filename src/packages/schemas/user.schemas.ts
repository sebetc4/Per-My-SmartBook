import * as yup from 'yup';
import { maxTokensOpenai, minTokensOpenai } from '../constants';

import {
    AddModifyOpenaiKeyBody,
    UpdateAccountBody,
    UpdateAISettingsBody,
    UpdateProfileBody,
    UpdateUserColorBody,
} from '../types';
import { emailValidation, usernameValidation } from './common.schemas';

const isValidOpenaiKey = (key: string | undefined): boolean => {
    if (key === undefined) {
        return false;
    }
    const keyFormat = /^sk-[a-zA-Z0-9]{48}$/;
    return keyFormat.test(key);
};

export const updateAccountSchema: yup.SchemaOf<UpdateAccountBody> = yup.object().shape({
    username: usernameValidation,
    email: emailValidation,
});

export const updateProfileSchema: yup.SchemaOf<UpdateProfileBody> = yup.object().shape({
    avatarFile: yup.mixed(),
});

export const updateAISettingsSchema: yup.SchemaOf<UpdateAISettingsBody> = yup.object().shape({
    maxTokens: yup.number().min(minTokensOpenai).max(maxTokensOpenai).required(),
    temperature: yup.number().min(0).max(1).required(),
});

export const addModifyOpenaiKeySchema: yup.SchemaOf<AddModifyOpenaiKeyBody> = yup.object().shape({
    key: yup.string().test('valid-openai-key', 'not-valid', isValidOpenaiKey).required('is-required'),
});

export const updateUserColorSchema: yup.SchemaOf<UpdateUserColorBody> = yup.object().shape({
    color: yup.string().required('is-required'),
});
