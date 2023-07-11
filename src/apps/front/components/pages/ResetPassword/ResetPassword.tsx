// Librairies
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
// MUI
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
// App
import { useAppDispatch } from '~/apps/front/hooks';
import {
    Path,
    PathParams,
    ResetPasswordBody,
    ResetPasswordConfirmPasswordError,
    ResetPasswordNewPasswordError,
    allResetPasswordConfirmPasswordErrors,
    allResetPasswordNewPasswordErrors,
} from '~/packages/types';
import { resetPasswordSchema } from '~/packages/schemas';
import { CustomError } from '~/packages/classes';
import { resetPassword, setAlert } from '~/store';
import { CustomPasswordInput } from '../..';


type ResetPasswordProps = {
    tokenIsValid: boolean;
};

export const ResetPassword = ({ tokenIsValid: initialValueTokenIsValid }: ResetPasswordProps) => {
    // Hoohs
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { t: resetPasswordT } = useTranslation('reset-password');
    const theme = useTheme();

    // State
    const [tokenIsValid, setTokenIsValid] = useState(initialValueTokenIsValid);

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<ResetPasswordBody>({
        resolver: yupResolver(resetPasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (body: ResetPasswordBody) => {
        const token = router.query.t;
        if (typeof token !== 'string') {
            return;
        }
        const res = await dispatch(resetPassword({ body, token }));
        if (res.meta.requestStatus === 'fulfilled') {
            router.push(`${Path.SIGNIN}?p=${PathParams.RESET_PASSWORD_SUCCESS}`);
        } else {
            switch (res.payload) {
                case CustomError.INVALID_RESET_PASSWORD_TOKEN.message:
                    setTokenIsValid(false);
                    break;
                default:
                    dispatch(setAlert({ type: 'error', message: 'error.update-password.default' }));
            }
        }
    };

    return tokenIsValid ? (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: theme.main.padding,
            }}
        >
            <Typography
                component='h1'
                variant='h1'
            >
                {resetPasswordT('title.h1')}
            </Typography>
            <Typography
                align='center'
                sx={{
                    mt: 1,
                    mb: 3,
                    maxWidth: '600px',
                }}
            >
                {resetPasswordT('text.new-password')}
            </Typography>
            <Container
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                maxWidth='xs'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    gap: 2,
                }}
            >
                <CustomPasswordInput
                    name='password'
                    label={resetPasswordT('input.newPassword.label')}
                    register={register('newPassword')}
                    errorMessage={
                        allResetPasswordNewPasswordErrors.includes(
                            errors.newPassword?.message as ResetPasswordNewPasswordError
                        )
                            ? resetPasswordT(
                                  `input.newPassword.error.${
                                      errors.newPassword!.message as ResetPasswordNewPasswordError
                                  }`
                              )
                            : undefined
                    }
                />
                <CustomPasswordInput
                    name='password'
                    label={resetPasswordT('input.confirmPassword.label')}
                    register={register('confirmPassword')}
                    errorMessage={
                        allResetPasswordConfirmPasswordErrors.includes(
                            errors.newPassword?.message as ResetPasswordConfirmPasswordError
                        )
                            ? resetPasswordT(
                                  `input.confirmPassword.error.${
                                      errors.newPassword!.message as ResetPasswordConfirmPasswordError
                                  }`
                              )
                            : undefined
                    }
                />

                <LoadingButton
                    loading={isSubmitting}
                    disabled={isSubmitting || !isDirty}
                    size='large'
                    type='submit'
                    variant='contained'
                    loadingPosition='start'
                    startIcon={
                        <SaveOutlinedIcon
                            fontSize='large'
                            sx={{ mb: 0.5 }}
                        />
                    }
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    {resetPasswordT('button.save')}
                </LoadingButton>
            </Container>
        </Container>
    ) : (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography>
                {resetPasswordT('text.invalid-link')}
            </Typography>
            <Button
                component={Link}
                href={Path.FORGOT_PASSWORD}
                variant='contained'
                sx={{ mt: 4 }}
            >
                {resetPasswordT('button.new-link')}
            </Button>
        </Container>
    );
};
