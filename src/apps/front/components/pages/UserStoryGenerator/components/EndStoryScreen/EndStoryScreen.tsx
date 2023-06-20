// Librairies
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
// MUI
import { Box, Button, Typography, useTheme } from '@mui/material';
// App
import { saveUserFinishedStory, setAlert } from '~/store';
import { SaveModal } from '..';
import { FinishedStoryTitle, Path, Visibility } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';

export const EndStoryScreen = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useAppDispatch();
    const theme = useTheme()
    const { t: storyGenerationT } = useTranslation('story-generator');
    const { t: alertT } = useTranslation('alert');

    // Store
    const { isLoading } = useAppSelector((state) => state.userStoryBeingGenerated);

    const [storyVisibity, setStoryVisibility] = useState<Visibility | null>(null);

    const handleSaveStory = async ({ title }: FinishedStoryTitle) => {
        const res = await dispatch(saveUserFinishedStory({ visibility: storyVisibity!, title }));
        dispatch(setAlert({ message: alertT('success.user-story-saved'), type: 'success' }));
        router.push(`${Path.STORY}/${res.payload}`);
    };

    const handleOpenSaveModal = (visibility: Visibility) => {
        setStoryVisibility(visibility);
    };

    const handleCloseSaveModal = () => {
        setStoryVisibility(null);
    };

    return (
        <>
            <Typography
                variant='h2'
                component='h2'
                textAlign='center'
                color={theme.text.body}
            >
                {storyGenerationT('FinishedStory.text.end')}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 6, gap: 6 }}>
                <Button
                    variant='outlined'
                    disabled={isLoading}
                    onClick={() => handleOpenSaveModal(Visibility.PUBLIC)}
                >
                    {storyGenerationT('FinishedStory.button.delete')}
                </Button>
                <Button
                    variant='outlined'
                    disabled={isLoading}
                    onClick={() => handleOpenSaveModal(Visibility.PUBLIC)}
                >
                    {storyGenerationT('FinishedStory.button.save-public')}
                </Button>
                <Button
                    variant='outlined'
                    disabled={isLoading}
                    onClick={() => handleOpenSaveModal(Visibility.PRIVATE)}
                >
                    {storyGenerationT('FinishedStory.button.save-private')}
                </Button>
            </Box>
            <SaveModal
                open={!!storyVisibity}
                handleClose={handleCloseSaveModal}
                handleConfirm={handleSaveStory}
                visibility={storyVisibity!}
            />
        </>
    );
};
