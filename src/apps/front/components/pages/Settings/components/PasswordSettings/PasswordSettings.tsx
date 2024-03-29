// Librairies
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// MUI
import { LoadingButton } from '@mui/lab';
import { Box, Container } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
// App
import {
    allPasswordFormCurrentPasswordErrors,
    allPasswordFormNewPasswordErrors,
    PasswordFormCurrentPasswordError,
    NewPasswordError,
    UpdatePasswordBody,
    PasswordFormConfirmPasswordError,
    allPasswordFormConfirmPasswordErrors,
} from '~/packages/types';
import { updatePasswordSchema } from '~/packages/schemas';
import { setAlert, updatePassword } from '~/store';
import { CustomError } from '~/packages/classes';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { CustomPasswordInput } from '~/apps/front/components/inputs/CustomPasswordInput/CustomPasswordInput';

export const PasswordSettings = () => {
    // Hoohs
    const dispatch = useAppDispatch();
    const { t } = useTranslation('settings');

    // Store
    const { error, isLoading } = useAppSelector((state) => state.user);

    // Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
        setError,
    } = useForm<UpdatePasswordBody>({
        resolver: yupResolver(updatePasswordSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data: UpdatePasswordBody) => {
        const res = await dispatch(updatePassword(data));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(setAlert({ type: 'success', message: 'success.update-password' }));
        } else {
            switch (error) {
                case CustomError.WRONG_PASSWORD.message:
                    setError('currentPassword', { type: 'custom', message: 'wrong' });
                    break;
                default:
                    setAlert({ type: 'error', message: 'error.update-password.default' });
            }
        }
        reset();
    };

    return (
        <Container maxWidth='xs'>
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
                maxWidth='xs'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <CustomPasswordInput
                        name='currentPassword'
                        label={t('PasswordForm.input.currentPassword.label')}
                        register={register('currentPassword')}
                        errorMessage={
                            allPasswordFormCurrentPasswordErrors.includes(
                                errors.currentPassword?.message as PasswordFormCurrentPasswordError
                            )
                                ? t(
                                      `PasswordForm.input.currentPassword.error.${
                                          errors.currentPassword!.message as PasswordFormCurrentPasswordError
                                      }`
                                  )
                                : undefined
                        }
                    />
                    <CustomPasswordInput
                        name='newPassword'
                        label={t('PasswordForm.input.newPassword.label')}
                        register={register('newPassword')}
                        errorMessage={
                            allPasswordFormNewPasswordErrors.includes(
                                errors.newPassword?.message as NewPasswordError
                            )
                                ? t(
                                      `PasswordForm.input.newPassword.error.${
                                          errors.newPassword!.message as NewPasswordError
                                      }`
                                  )
                                : undefined
                        }
                    />
                    <CustomPasswordInput
                        name='confirmPassword'
                        label={t('PasswordForm.input.confirmPassword.label')}
                        register={register('confirmPassword')}
                        errorMessage={
                            allPasswordFormConfirmPasswordErrors.includes(errors.confirmPassword?.message as PasswordFormConfirmPasswordError)
                                ? t(`PasswordForm.input.confirmPassword.error.${errors.confirmPassword!.message as PasswordFormConfirmPasswordError}`)
                                : undefined
                        }
                    />
                </Box>

                <LoadingButton
                    loading={isLoading}
                    disabled={isLoading || !isDirty}
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
                    sx={{ mt: 4, mb: 2 }}
                    fullWidth
                >
                    {t('PasswordForm.button.save')}
                </LoadingButton>
            </Box>
        </Container>
    );
};
