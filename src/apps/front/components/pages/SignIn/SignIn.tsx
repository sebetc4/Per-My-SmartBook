// Librairies
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
// Mui
import { Box, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// App
import { CustomError } from '~/packages/classes';
import {
    allLoginEmailErrors,
    allLoginPasswordErrors,
    LoginEmailError,
    LoginPasswordError,
    LoginWithCredentialsBody,
    Path,
} from '~/packages/types';
import { GoogleButton, CustomPasswordInput, CustomTextField } from '../..';
import { login, setAlert } from '~/store';
// Images
import LoginImage from 'public/images/illustrations/sign-in.png';
import Logo from 'public/images/logo/logo.png';
import { useAppDispatch } from '~/apps/front/hooks';
import { loginWithCredentialsSchema } from '~/packages/schemas';

export const SignIn = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { t: signinT } = useTranslation('signin');
    const theme = useTheme();
    const isUpSmScreen = useMediaQuery(theme.breakpoints.up('sm'));

    // Form
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<LoginWithCredentialsBody>({
        resolver: yupResolver(loginWithCredentialsSchema),
        mode: 'onTouched',
    });

    // State
    const [showProviderError, setShowProviderError] = useState<boolean>(false);

    // Handlers
    const onSubmit = async (data: LoginWithCredentialsBody) => {
        showProviderError && setShowProviderError(false);
        const res = await dispatch(login(data));
        if (res.meta.requestStatus === 'fulfilled') {
            router.push('/');
        } else {
            switch (res.payload) {
                case CustomError.EMAIL_ALREADY_EXISTS_OTHER_PROVIDER.message:
                    setShowProviderError(true);
                    break;
                case CustomError.WRONG_EMAIL.message:
                    setError('email', { type: 'custom', message: 'no-associated-account' });
                    break;
                case CustomError.WRONG_PASSWORD.message:
                    setError('password', { type: 'custom', message: 'wrong' });
                    break;
                default:
                    dispatch(setAlert({ type: 'error', message: 'error.login.default' }));
            }
        }
    };

    return (
        <Grid
            container
            maxWidth='xl'
            sx={{
                ml: 'auto',
                mr: 'auto',
                pt: theme.main.padding,
                pb: theme.main.padding,
            }}
        >
            <Grid
                item
                xxs={12}
                md={6}
                sx={{
                    height: { xxs: 'auto', md: '100%' },
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Container
                    maxWidth='xs'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: { xxs: 'block', md: 'none' } }}>
                        <Image
                            src={Logo}
                            alt='Logo My StoryBook'
                            placeholder='blur'
                            quality={100}
                            width={150}
                            height={150}
                            style={{ borderRadius: '40px' }}
                        />
                    </Box>
                    <Typography
                        component='h1'
                        variant='h2'
                        color={theme.text.title}
                    >
                        {signinT('title.h1')}
                    </Typography>
                    <Typography
                        component='h2'
                        align='center'
                        color={theme.text.subtitle}
                        sx={{
                            mt: 1,
                            fontSize: '1.2rem',
                        }}
                    >
                        {signinT('title.h2')}
                    </Typography>
                    <Box
                        component='form'
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            mt: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                gap: 2,
                            }}
                        >
                            <CustomTextField
                                name='email'
                                label={signinT('input.email.label')}
                                type='email'
                                register={register('email')}
                                errorMessage={
                                    allLoginEmailErrors.includes(errors.email?.message as LoginEmailError)
                                        ? signinT(`input.email.error.${errors.email!.message as LoginEmailError}`)
                                        : undefined
                                }
                            />
                            <CustomPasswordInput
                                name='password'
                                label={signinT('input.password.label')}
                                register={register('password')}
                                errorMessage={
                                    allLoginPasswordErrors.includes(errors.password?.message as LoginPasswordError)
                                        ? signinT(`input.password.error.${errors.password!.message as LoginPasswordError}`)
                                        : undefined
                                }
                            />
                        </Box>
                        <LoadingButton
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            type='submit'
                            variant='contained'
                            sx={{ marginTop: 2, marginBottom: 2 }}
                            fullWidth
                            size='large'
                        >
                            {signinT('button.signin')}
                        </LoadingButton>
                        <GoogleButton />
                        {showProviderError && (
                            <Typography
                                color='error'
                                sx={{ mt: 4, textAlign: 'center' }}
                            >
                                {signinT('text.account-already-exists-with-this-email')}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ mt: 4, display: 'flex', gap: 1 }}>
                        <Typography color={theme.text.body}>{signinT('text.no-account')}</Typography>
                        <Link
                            href={Path.SIGNUP}
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                color='primary'
                                sx={{
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {signinT('button.signup')}
                            </Typography>
                        </Link>
                    </Box>
                </Container>
            </Grid>
            {isUpSmScreen && (
                <Grid
                    item
                    md={6}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '600px',
                            m: 3,
                            aspectRatio: '1 / 1',
                            position: 'relative',
                            borderRadius: 10,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={LoginImage}
                            alt=''
                            placeholder='blur'
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                            quality={100}
                        />
                    </Box>
                </Grid>
            )}
        </Grid>
    );
};
