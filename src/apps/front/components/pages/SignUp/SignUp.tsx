// Librairies
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
// Mui
import { LoadingButton } from '@mui/lab';
import { Box, Typography, Container, Grid, useMediaQuery, useTheme } from '@mui/material';
// App
import {
    allSignUpEmailErrors,
    allSignUpPasswordErrors,
    allSignUpUsernameErrors,
    Path,
    SignUpBody,
    SignUpEmailError,
    SignUpPasswordError,
    SignUpUsernameError,
} from '~/packages/types';
import { signUpSchema } from '~/packages/schemas';
import { setAlert, signUp } from '~/store';
import { CustomError } from '~/packages/classes';
import { useAppDispatch } from '~/apps/front/hooks';
//Images
import SignUpImage from '@/../public/images/illustrations/signup.png';
import Logo from '@/../public/images/logo/logo.png';
import { CustomTextField } from '../../inputs/CustomTextField/CustomTextField';
import { CustomPasswordInput } from '../../inputs/CustomPasswordInput/CustomPasswordInput';
import { GoogleButton } from '../../buttons/GoogleButton/GoogleButton';

export const SignUp = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { t: signupT } = useTranslation('signup');
    const theme = useTheme();
    const isUpSmScreen = useMediaQuery(theme.breakpoints.up('sm'));

    // Form
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm<SignUpBody>({
        resolver: yupResolver(signUpSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: SignUpBody) => {
        const res = await dispatch(signUp(data));
        if (res.meta.requestStatus === 'fulfilled') {
            router.push(Path.SIGNIN);
        } else {
            switch (res.payload) {
                case CustomError.EMAIL_ALREADY_EXISTS.message:
                    setError('email', { type: 'custom', message: 'already-associated' });
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
            sx={{ ml: 'auto', mr: 'auto', py: theme.main.padding }}
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
                        color={theme.text.title}
                        component='h1'
                        variant='h2'
                    >
                        {signupT('title.h1')}
                    </Typography>
                    <Typography
                        component='h2'
                        align='center'
                        color={theme.text.subtitle}
                        sx={{
                            mt: 2,
                            fontSize: '1.2rem',
                        }}
                    >
                        {signupT('title.h2')}
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
                                name='username'
                                label={signupT('input.username.label')}
                                type='text'
                                register={register('username')}
                                errorMessage={
                                    allSignUpUsernameErrors.includes(errors.username?.message as SignUpUsernameError)
                                        ? signupT(
                                              `input.username.error.${errors.username!.message as SignUpUsernameError}`
                                          )
                                        : undefined
                                }
                            />
                            <CustomTextField
                                name='email'
                                label={signupT('input.email.label')}
                                type='email'
                                register={register('email')}
                                errorMessage={
                                    allSignUpEmailErrors.includes(errors.email?.message as SignUpEmailError)
                                        ? signupT(`input.email.error.${errors.email!.message as SignUpEmailError}`)
                                        : undefined
                                }
                            />
                            <CustomPasswordInput
                                name='password'
                                label={signupT('input.password.label')}
                                register={register('password')}
                                errorMessage={
                                    allSignUpPasswordErrors.includes(errors.password?.message as SignUpPasswordError)
                                        ? signupT(
                                              `input.password.error.${errors.password!.message as SignUpPasswordError}`
                                          )
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
                            size='large'
                            fullWidth
                        >
                            {signupT('button.signup')}
                        </LoadingButton>
                        <GoogleButton />
                    </Box>
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            gap: 1,
                            flexDirection: { xxs: 'column', xs: 'rox' },
                            alignItems: 'center',
                        }}
                    >
                        <Typography>{signupT('text.already-signup')}</Typography>
                        <Link
                            href={Path.SIGNIN}
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
                                {signupT('button.signin')}
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
                            m: 3,
                            maxWidth: '600px',
                            aspectRatio: '1 / 1',
                            position: 'relative',
                            borderRadius: 10,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={SignUpImage}
                            alt='Hotel en bord de mer'
                            placeholder='blur'
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                </Grid>
            )}
        </Grid>
    );
};
