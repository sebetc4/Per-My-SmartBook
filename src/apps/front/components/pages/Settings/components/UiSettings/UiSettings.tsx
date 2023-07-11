// Libraries
import { SketchPicker } from 'react-color';
import React, { useState } from 'react';
// MUI
import { Box, Container, Divider, FormControlLabel, Switch, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Api
import { ColorMode } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { setAlert, toggleColorMode, updateUserColor } from '~/store';
import { useTranslation } from 'react-i18next';

export const UiSettings = () => {
    //Hooks
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const { t: settingsT } = useTranslation('settings');

    const { session } = useAppSelector((state) => state.user);
    const { isLoading, colorMode } = useAppSelector((state) => state.app);

    const [userColor, setUserColor] = useState(session!.userColor);

    const handleUpdateUserColor = async () => {
        const res = await dispatch(updateUserColor({ color: userColor }));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(setAlert({ type: 'success', message: 'success.update-user-color' }));
        } else {
            dispatch(setAlert({ type: 'error', message: 'error.update-data.default' }));
        }
    };

    const handleToggleColorMode = async () => {
        const res = await dispatch(toggleColorMode());
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(setAlert({ type: 'success', message: 'success.toggle-color-mode' }));
        } else {
            dispatch(setAlert({ type: 'error', message: 'error.update-data.default' }));
        }
    };

    return (
        <Container
            maxWidth='xl'
            sx={{
                display: 'flex',
                flexDirection: { xxs: 'column', md: 'row' },
                justifyContent: 'space-between',
                gap: 6,
                py: theme.main.padding,
            }}
        >
            <Box flex={2}>
                <Divider flexItem>
                    <Typography
                        component='h3'
                        variant='h3'
                        textAlign='center'
                        color={theme.text.subtitle}
                    >
                        {settingsT('AppearanceSettings.title.h3.color-mode')}
                    </Typography>
                </Divider>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 6 }}>
                    <FormControlLabel
                        sx={{ color: theme.text.body }}
                        value={colorMode === ColorMode.LIGHT ? 'Clair' : 'Sombre'}
                        control={
                            <Switch
                                disabled={isLoading}
                                color='primary'
                                checked={colorMode === ColorMode.DARK}
                                onChange={handleToggleColorMode}
                            />
                        }
                        label={
                            colorMode === ColorMode.LIGHT
                                ? settingsT('AppearanceSettings.text.h3.light')
                                : settingsT('AppearanceSettings.text.h3.dark')
                        }
                        labelPlacement='top'
                    />
                    {colorMode === ColorMode.LIGHT ? (
                        <Brightness7Icon sx={{ fontSize: '2rem', color: theme.text.body }} />
                    ) : (
                        <Brightness4Icon sx={{ fontSize: '2rem', color: theme.text.body }} />
                    )}
                </Box>
            </Box>
            <Box flex={3}>
                <Divider flexItem>
                    <Typography
                        component='h3'
                        variant='h3'
                        textAlign='center'
                        color={theme.text.subtitle}
                    >
                        {settingsT('AppearanceSettings.title.h3.user-color')}{' '}
                    </Typography>
                </Divider>
                <Box
                    sx={{
                        mt: 6,
                        display: 'flex',
                        flexDirection: { xxs: 'column', xl: 'row' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    <Typography sx={{ fontSize: '2rem', fontWeight: 500, color: userColor }}>
                        {session?.username}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <SketchPicker
                            color={userColor}
                            onChangeComplete={(color) => setUserColor(color.hex)}
                        />
                        <LoadingButton
                            sx={{ mt: 2, mb: {xxs: 6, md: 0} }}
                            variant='outlined'
                            disabled={isLoading}
                            loading={isLoading}
                            onClick={handleUpdateUserColor}
                        >
                            {settingsT('AppearanceSettings.button.confirm')}
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
