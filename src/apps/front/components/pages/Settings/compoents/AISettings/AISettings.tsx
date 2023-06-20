// Librairies
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Container, Typography, Slider, Tooltip, Button, Divider, IconButton, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import DeleteIcon from '@mui/icons-material/Delete';
// App
import { UpdateAISettingsReq } from '~/packages/types';
import { updateProfileSchema } from '~/packages/schemas';
import { deleteOpenaiKey, setAlert, updateAISettings } from '~/store';
import { AddModifyOpenaiKeyModal } from '..';
import { maxTokensOpenai, minTokensOpenai } from '~/packages/constants';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { ConfirmModal } from '~/apps/front/components/modal/ConfirmModal/ConfirmModal';

export const AISettings = () => {
    // Hoohs
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const { t } = useTranslation('settings');

    // Store
    const { settings, isLoading } = useAppSelector((state) => state.user);
    const openaiSettings = settings?.ai.openai;

    // Form
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty },
    } = useForm<UpdateAISettingsReq>({
        resolver: yupResolver(updateProfileSchema),
        mode: 'onTouched',
        defaultValues: { maxTokens: openaiSettings?.maxTokens, temperature: openaiSettings?.temperature },
    });

    const [openAddOpenaiKeyModal, setOpenAddOpenaiKeyModal] = useState(false);
    const [openModifyOpenaiKeyModal, setOpenModifyOpenaiKeyModal] = useState(false);
    const [openDeleteOpenaiKeyConfirmMoal, setOpenDeleteOpenaiKeyConfirmMoal] = useState(false);

    const onSubmit = async (data: UpdateAISettingsReq) => {
        const res = await dispatch(updateAISettings(data));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(setAlert({ type: 'success', message: 'success.update-data' }));
        } else {
            dispatch(setAlert({ type: 'error', message: 'error.update-data.default' }));
        }
        reset(data);
    };

    const handleDeleteOpenaiKey = () => {
        dispatch(deleteOpenaiKey());
        setOpenDeleteOpenaiKeyConfirmMoal(false);
    };

    return (
        <>
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
                        <Box>
                            <Typography
                                id='maxTokens-slider'
                                gutterBottom
                                color={theme.text.body}
                            >
                                {t('AISettings.input.maxTokens.label')}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Controller
                                    name='maxTokens'
                                    control={control}
                                    render={({ field: { value, ...rest } }) => (
                                        <Slider
                                            {...rest}
                                            value={value}
                                            min={minTokensOpenai}
                                            max={maxTokensOpenai}
                                            step={100}
                                            valueLabelDisplay='auto'
                                            aria-labelledby='maxiTokens-slider'
                                        />
                                    )}
                                />
                                <Tooltip
                                    title={t('AISettings.input.maxTokens.tooltip')}
                                    placement='right'
                                >
                                    <HelpOutlineOutlinedIcon sx={{ color: theme.text.body }} />
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box>
                            <Typography
                                id='temperature-slider'
                                gutterBottom
                                color={theme.text.body}
                            >
                                {t('AISettings.input.temperature.label')}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Controller
                                    name='temperature'
                                    control={control}
                                    render={({ field: { value, ...rest } }) => (
                                        <Slider
                                            {...rest}
                                            value={value}
                                            min={0}
                                            max={1}
                                            step={0.1}
                                            valueLabelDisplay='auto'
                                            aria-labelledby='temperature-slider'
                                        />
                                    )}
                                />
                                <Tooltip
                                    title={t('AISettings.input.temperature.tooltip')}
                                    placement='right'
                                >
                                    <HelpOutlineOutlinedIcon sx={{ color: theme.text.body }} />
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                    <LoadingButton
                        size='large'
                        loading={isLoading}
                        disabled={isLoading || !isDirty}
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
                        {t('AISettings.button.save')}
                    </LoadingButton>
                </Box>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <Box sx={{ mt: 6, width: '100%' }}>
                    <Typography
                        variant='h6'
                        component='h3'
                        color={theme.text.subtitle}
                    >
                        {t('AISettings.title.h3.openai-key')}
                    </Typography>
                    {openaiSettings?.key ? (
                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography color={theme.text.body}>{openaiSettings.key}</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Tooltip title={t('AISettings.button.modify.tooltip')}>
                                    <IconButton
                                        aria-label={'modify'}
                                        onClick={() => setOpenModifyOpenaiKeyModal(true)}
                                    >
                                        <ChangeCircleIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={t('AISettings.button.delete.tooltip')}>
                                    <IconButton
                                        aria-label='delete'
                                        onClick={() => setOpenDeleteOpenaiKeyConfirmMoal(true)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ display: 'block', color: theme.text.body }} >{t('AISettings.text.no-key')}</Typography>
                            <Button
                                variant='contained'
                                endIcon={<AddIcon />}
                                onClick={() => setOpenAddOpenaiKeyModal(true)}
                            >
                                {t('AISettings.button.add-key')}
                            </Button>
                        </Box>
                    )}
                </Box>
            </Container>
            <AddModifyOpenaiKeyModal
                open={openAddOpenaiKeyModal}
                action={'add'}
                handleClose={() => setOpenAddOpenaiKeyModal(false)}
            />
            <AddModifyOpenaiKeyModal
                open={openModifyOpenaiKeyModal}
                action={'modify'}
                handleClose={() => setOpenModifyOpenaiKeyModal(false)}
            />
            <ConfirmModal
                open={openDeleteOpenaiKeyConfirmMoal}
                title={t('DeleteOpenaiKeyConfirmMoal.title')}
                text={t('DeleteOpenaiKeyConfirmMoal.text')}
                cancelButtonText={t('DeleteOpenaiKeyConfirmMoal.button.cancel')}
                confirmButtonText={t('DeleteOpenaiKeyConfirmMoal.button.confirm')}
                handleConfirm={handleDeleteOpenaiKey}
                handleClose={() => setOpenDeleteOpenaiKeyConfirmMoal(false)}
                isLoading={isLoading}
            />
        </>
    );
};
