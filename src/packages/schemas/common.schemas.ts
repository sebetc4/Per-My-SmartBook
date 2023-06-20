import * as yup from 'yup';
import { isValidId } from '../functions';

export const usernameValidation = yup
    .string()
    .strict(false)
    .trim()
    .min(6, 'too-short')
    .max(20, 'too-long')
    .required('is-required');

export const emailValidation = yup.string().strict(false).trim().email('not-valid').required('is-required');

export const idSchema = yup.string().test('valid-id', 'not-valid', isValidId).required('is-required');
