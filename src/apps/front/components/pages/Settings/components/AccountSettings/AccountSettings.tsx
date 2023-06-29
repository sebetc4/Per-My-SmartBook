// Librairies
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
// MUI
import { Box, Container } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
// App
import {
    AccountFormEmailError,
    AccountFormUsernameError,
    allAccountFormEmailErrors,
    allAccountFormUsernameErrors,
    UpdateAccountBody,
} from '~/packages/types';
import { updateAccountSchema } from '~/packages/schemas';
import { setAlert, updateAccount } from '~/store';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { CustomTextField } from '~/apps/front/components/inputs/CustomTextField/CustomTextField';

export const AccountSettings = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const { t } = useTranslation('settings');

    // Store
    const { session: user, settings, isLoading } = useAppSelector((state) => state.user);

    // Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<UpdateAccountBody>({
        resolver: yupResolver(updateAccountSchema),
        mode: 'onTouched',
        defaultValues: { username: user?.username, email: settings?.email },
    });

    // Vérifier si le compte n'est pas déjà lié à une adresse!!!!
    const onSubmit = async (data: UpdateAccountBody) => {
        if (settings?.email !== data.email || user?.username !== data.username) {
            const res = await dispatch(updateAccount(data));
            if (res.meta.requestStatus === 'fulfilled') {
                dispatch(setAlert({ type: 'success', message: 'success.update-data' }));
            } else {
                dispatch(setAlert({ type: 'error', message: 'error.update-data.default' }));
            }
            reset(data);
        }
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
                        gap: 3,
                    }}
                >
                    <CustomTextField
                        name='username'
                        label={t('AccountForm.input.username.label')}
                        type='text'
                        register={register('username')}
                        errorMessage={
                            allAccountFormUsernameErrors.includes(errors.username?.message as AccountFormUsernameError)
                                ? t(
                                      `AccountForm.input.username.error.${
                                          errors.username!.message as AccountFormUsernameError
                                      }`
                                  )
                                : undefined
                        }
                    />
                    <CustomTextField
                        disabled={user?.authProvider !== 'credentials'}
                        name='email'
                        label={t('AccountForm.input.email.label')}
                        type='email'
                        register={register('email')}
                        errorMessage={
                            allAccountFormEmailErrors.includes(errors.email?.message as AccountFormEmailError)
                                ? t(`AccountForm.input.email.error.${errors.email!.message as AccountFormEmailError}`)
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
                    sx={{ marginTop: 4, marginBottom: 2 }}
                    fullWidth
                >
                    {t('AccountForm.button.save')}
                </LoadingButton>
            </Box>
        </Container>
    );
};
