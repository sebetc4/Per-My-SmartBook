import * as yup from 'yup';

import { ForgotPasswordBody, LoginWithCredentialsBody, ResetPasswordBody, SignUpBody, UpdatePasswordBody } from '../types';
import { emailValidation, usernameValidation } from '.';

export const signUpSchema: yup.SchemaOf<SignUpBody> = yup.object().shape({
    username: usernameValidation,
    email: emailValidation,
    password: yup.string().required('is-required').min(6, 'too-short').max(40, 'too-long'),
});

export const loginWithCredentialsSchema: yup.SchemaOf<LoginWithCredentialsBody> = yup.object().shape({
    email: emailValidation,
    password: yup.string().required('is-required').min(6, 'invalid-password').max(40, 'invalid-password'),
});

export const updatePasswordSchema: yup.SchemaOf<UpdatePasswordBody> = yup.object().shape({
    currentPassword: yup.string().required('wrong').min(6, 'wrong').max(40, 'wrong'),
    newPassword: yup
        .string()
        .notOneOf([yup.ref('currentPassword')], 'same-as-the-old')
        .required('is-required')
        .min(6, 'too-short')
        .max(40, 'too-long'),
    confirmPassword: yup
        .string()
        .required('is-required')
        .oneOf([yup.ref('newPassword')], 'not-same-as-the-new-password'),
});

export const forgotPasswordSchema: yup.SchemaOf<ForgotPasswordBody> = yup.object().shape({
    email: emailValidation,
});

export const resetPasswordSchema: yup.SchemaOf<ResetPasswordBody> = yup.object().shape({
    newPassword: yup
        .string()
        .min(6, 'too-short')
        .max(40, 'too-long')
        .required('is-required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'not-same-as-the-new-password')
        .required('is-required')
    });
