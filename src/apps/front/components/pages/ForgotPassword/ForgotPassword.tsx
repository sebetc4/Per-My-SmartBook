// Librairies
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
// MUI
import { Box, Container, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// App
import { useAppDispatch } from '~/apps/front/hooks';
import { CustomError } from '~/packages/classes';
import { forgotPasswordSchema } from '~/packages/schemas';
import { ForgotPasswordBody, ForgotPasswordEmailError, allForgotPasswordEmailErrors } from '~/packages/types';
import { forgotPassword, setAlert } from '~/store';
import { CustomTextField } from '../..';
// Images
import PadlockImage from 'public/images/illustrations/padlock.png';

export const ForgotPassword = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const { t: forgotPasswordT } = useTranslation('forgot-password');
    const theme = useTheme()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<ForgotPasswordBody>({
        resolver: yupResolver(forgotPasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: ForgotPasswordBody) => {
        const res = await dispatch(forgotPassword(data));
        if (res.meta.requestStatus !== 'fulfilled') {
            console.log(res.payload);
            switch (res.payload) {
                case CustomError.WRONG_EMAIL.message:
                    setError('email', { type: 'custom', message: 'wrong-email' });
                    break;
                case CustomError.WRONG_AUTH_PROVIDER.message:
                    setError('email', { type: 'custom', message: 'wrong-auth-provider' });
                    break;
                default:
                    dispatch(setAlert({ type: 'error', message: 'error.forgot-password-default' }));
            }
        } else {
            dispatch(setAlert({ type: 'success', message: 'success.reset-password' }));
        }
    };

    return (
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
                textAlign='center'
            >
                {forgotPasswordT('title.h1')}
            </Typography>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    aspectRatio: '1/1',
                }}
            >
                <Image
                    src={PadlockImage}
                    alt={forgotPasswordT('img.alt')}
                    fill
                    quality={100}
                />
            </Box>
            <Typography
                align='center'
                sx={{
                    maxWidth: '600px',
                }}
            >
                {forgotPasswordT('text.main')}
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
                    mt: 2
                }}
            >
                <CustomTextField
                    name='email'
                    label='Adresse e-mail'
                    type='email'
                    register={register('email')}
                    errorMessage={
                        allForgotPasswordEmailErrors.includes(errors.email?.message as ForgotPasswordEmailError)
                            ? forgotPasswordT(`input.email.error.${errors.email!.message as ForgotPasswordEmailError}`)
                            : undefined
                    }
                />
                <LoadingButton
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    type='submit'
                    variant='contained'
                    fullWidth
                    size='large'
                    sx={{ mt: 2 }}
                >
                    {forgotPasswordT('button.send')}
                </LoadingButton>
            </Container>
        </Container>
    );
};
