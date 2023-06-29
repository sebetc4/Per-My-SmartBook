// Librairies
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Typography } from '@mui/material';
// App
import { FinishedUserStoryPreview, Path } from '~/packages/types';
import { deleteUnfinishedStory } from '~/store';
import { ConfirmModal } from '../../../..';
import { FinishedStoryDetails } from '..';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { getRandomBookImage, getRandomHourglassImage, placeholderValue } from '~/apps/front/utils';

type FinishedStoryCardProps = {
    story: FinishedUserStoryPreview;
};

export const FinishedStoryCard = ({ story }: FinishedStoryCardProps) => {
    // Hooks
    const { t: userStoriesT } = useTranslation('user-stories');
    const dispatch = useAppDispatch();

    // Store
    const { isLoading } = useAppSelector((state) => state.userStories);

    // State
    const [openDeleteStoryConfirmModal, setOpenDeleteStoryConfirmModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [bookImage] = useState(getRandomBookImage());

    const handleDeleteUnfinishedStory = async () => {
        await dispatch(deleteUnfinishedStory(story.id));
        setOpenDeleteStoryConfirmModal(false);
    };

    return (
        <>
            <Box
                component='article'
                sx={{
                    position: 'relative',
                    maxWidth: '350px',
                    borderRadius: 6,
                    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    overflow: 'hidden',
                }}
                onClick={() => setOpenDetailsModal(true)}
            >
                <Box sx={{ position: 'relative', width: '350px', height: '350px' }}>
                    <Image
                        src={story.cover?.url || bookImage}
                        alt={"Illustration de l'histoire"}
                        placeholder={placeholderValue(!!story.cover)}
                        blurDataURL={story.cover?.plaiceholder}
                        fill
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: 32,
                        p: 4,
                        pt: 0,
                        backgroundColor: '#fff',
                        zIndex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Box>
                        <Typography
                            textAlign='center'
                            sx={{ mt: 2, mb: 2, fontSize: '1.1rem', fontWeight: 'bold' }}
                        >
                            {story.title}
                        </Typography>
                        <Typography textAlign='justify'>{story.topic}</Typography>
                    </Box>
                </Box>
            </Box>
            <ConfirmModal
                open={openDeleteStoryConfirmModal}
                title={userStoriesT('DeleteUnfinishedStoryConfirmModal.title')}
                text={userStoriesT('DeleteUnfinishedStoryConfirmModal.text')}
                cancelButtonText={userStoriesT('DeleteUnfinishedStoryConfirmModal.button.cancel')}
                confirmButtonText={userStoriesT('DeleteUnfinishedStoryConfirmModal.button.confirm')}
                handleClose={() => setOpenDeleteStoryConfirmModal(false)}
                handleConfirm={handleDeleteUnfinishedStory}
                isLoading={isLoading}
            />
            <FinishedStoryDetails
                open={openDetailsModal}
                handleClose={() => setOpenDetailsModal(false)}
                story={story}
            />
        </>
    );
};
