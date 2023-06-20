import React, { ChangeEvent, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Box, Container, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { UpdateProfileReq } from '~/packages/types';
import { updateProfileSchema } from '~/packages/schemas';
import { setAlert, updateProfile } from '~/store';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { CustomAvatar } from '~/apps/front/components/CustomAvatar/CustomAvatar';

export const ProfileSettings = () => {
    // Hoohs
    const dispatch = useAppDispatch();
    const { t } = useTranslation('settings');

    // Store
    const { session: user, isLoading } = useAppSelector((state) => state.user);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | ArrayBuffer | null>(user!.avatarUrl);

    // Form
    const {
        handleSubmit,
        formState: { isDirty },
    } = useForm<UpdateProfileReq>({
        resolver: yupResolver(updateProfileSchema),
        mode: 'onTouched',
        defaultValues: {},
    });

    const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = () => reader.readyState === 2 && setAvatarPreview(reader.result);
        reader.readAsDataURL(file);
        setAvatarFile(file);
    };

    const onSubmit = async (data: UpdateProfileReq) => {
        const formData = new FormData();
        avatarFile && formData.append('avatarFile', avatarFile);
        const res = await dispatch(updateProfile(formData));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(setAlert({ type: 'success', message: 'success.update-data' }));
        } else {
            dispatch(setAlert({ type: 'error', message: 'error.update-data.default' }));
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
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <IconButton
                        color='primary'
                        aria-label='upload picture'
                        component='label'
                    >
                        <input
                            hidden
                            onChange={handleChangeAvatar}
                            accept='image/*'
                            type='file'
                        />
                        <CustomAvatar
                            username={user!.username}
                            avatarUrl={avatarPreview as string}
                            size={120}
                        />
                    </IconButton>
                </Box>
                <LoadingButton
                    size='large'
                    loading={isLoading}
                    disabled={isLoading || (!isDirty && !avatarFile)}
                    type='submit'
                    variant='contained'
                    sx={{ marginTop: 4, marginBottom: 2 }}
                    loadingPosition='start'
                    startIcon={
                        <SaveOutlinedIcon
                            fontSize='large'
                            sx={{ mb: 0.5 }}
                        />
                    }
                    fullWidth
                >
                    {t('ProfileForm.button.save')}
                </LoadingButton>
            </Box>
        </Container>
    );
};
