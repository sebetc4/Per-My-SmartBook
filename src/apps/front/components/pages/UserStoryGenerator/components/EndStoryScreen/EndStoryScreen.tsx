// Librairies
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
// MUI
import { Box, Button, Typography, useTheme } from '@mui/material';
// App
import { saveUserFinishedStory, setAlert } from '~/store';
import { DeleteModal, SaveModal } from '..';
import { FinishedStoryTitle, Path, Visibility } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';

export const EndStoryScreen = () => {
    // Hooks
    const router = useRouter();
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const { t: storyGenerationT } = useTranslation('story-generator');

    // Store
    const { isLoading } = useAppSelector((state) => state.userStoryBeingGenerated);

    const [storyVisibity, setStoryVisibility] = useState<Visibility | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    const handleSaveStory = async ({ title }: FinishedStoryTitle) => {
        const res = await dispatch(saveUserFinishedStory({ visibility: storyVisibity!, title }));
        dispatch(setAlert({ message: 'success.user-story-saved', type: 'success' }));
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
                sx={{ mt: 6 }}
            >
                {storyGenerationT('FinishedStory.text.end')}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xxs: 'column', sm: 'row' },
                    justifyContent: 'center',
                    mt: 6,
                    mb: 6,
                    gap: { xxs: 4, sm: 6 },
                }}
            >
                <Button
                    size='large'
                    variant='outlined'
                    disabled={isLoading}
                    onClick={() => setOpenDeleteModal(true)}
                >
                    {storyGenerationT('FinishedStory.button.delete')}
                </Button>
                <Button
                    size='large'
                    variant='outlined'
                    disabled={isLoading}
                    onClick={() => handleOpenSaveModal(Visibility.PUBLIC)}
                >
                    {storyGenerationT('FinishedStory.button.save-public')}
                </Button>
                <Button
                    size='large'
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
            <DeleteModal
                open={openDeleteModal}
                handleClose={() => setOpenDeleteModal(false)}
            />
        </>
    );
};
