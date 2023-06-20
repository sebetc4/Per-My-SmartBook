// Librairies
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Collapse, Divider, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
// App
import { deleteUnfinishedStory } from '~/store';
import { ConfirmModal } from '../../../..';
import { Path, UnfinishedUserStoryPreview } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { getRandomBookImage, placeholderValue } from '~/apps/front/utils';

type StoryCardProps = {
    story: UnfinishedUserStoryPreview;
    isActive: boolean;
};

export const UnfinishedStoryCard = ({ story, isActive }: StoryCardProps) => {
    // Hooks
    const { t } = useTranslation('user-stories');
    const dispatch = useAppDispatch();
    const router = useRouter();
    const contentBoxRef = useRef<HTMLDivElement>(null);

    // Store
    const { isLoading } = useAppSelector((state) => state.userStories);

    // State
    const [bookImage] = useState(getRandomBookImage());
    const [openDeleteStoryConfirmModal, setOpenDeleteStoryConfirmModal] = useState(false);

    const handleContinueStory = async (storyId: string) => {
        router.push({
            pathname: Path.USER_STORY_GENERATOR,
            query: { id: storyId },
        });
    };

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
                    paddingBottom: `${contentBoxRef.current?.offsetHeight}px`,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '350px',
                        height: '350px',
                    }}
                >
                    <Image
                        src={story.cover?.url || bookImage}
                        placeholder={placeholderValue(!!story.cover)}
                        blurDataURL={story.cover?.plaiceholder}
                        alt={"Illustration de l'histoire"}
                        fill
                    />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        boxSizing: 'border-box',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        borderTopLeftRadius: 32,
                        p: 4,
                        pt: 0,
                        backgroundColor: '#fff',
                        zIndex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Collapse in={isActive}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                            <IconButton
                                aria-label='delete'
                                onClick={() => setOpenDeleteStoryConfirmModal(true)}
                            >
                                <DeleteIcon fontSize='inherit' />
                            </IconButton>
                            <IconButton
                                onClick={() => handleContinueStory(story.id)}
                                aria-label='delete'
                            >
                                <KeyboardArrowRightRoundedIcon
                                    fontSize='inherit'
                                    color='primary'
                                />
                            </IconButton>
                        </Box>
                        <Divider />
                    </Collapse>
                    <Box ref={contentBoxRef}>
                        <Typography
                            textAlign='justify'
                            sx={{ mt: 1 }}
                        >
                            {story.topic}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <ConfirmModal
                open={openDeleteStoryConfirmModal}
                title={t('DeleteUnfinishedStoryConfirmModal.title')}
                text={t('DeleteUnfinishedStoryConfirmModal.text')}
                cancelButtonText={t('DeleteUnfinishedStoryConfirmModal.button.cancel')}
                confirmButtonText={t('DeleteUnfinishedStoryConfirmModal.button.confirm')}
                handleClose={() => setOpenDeleteStoryConfirmModal(false)}
                handleConfirm={handleDeleteUnfinishedStory}
                isLoading={isLoading}
            />
        </>
    );
};
