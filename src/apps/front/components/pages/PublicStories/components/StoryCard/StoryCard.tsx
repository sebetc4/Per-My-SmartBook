import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';

import { FinishedPublicStoryPreview, Path } from '../../../../../../../packages/types';
import { placeholderValue, getRandomBookImage } from '../../../../../utils';
import { StoryDetails } from '..';
import { useAppMediaQuery } from '../../../../../hooks';

type StoryItemProps = {
    story: FinishedPublicStoryPreview;
};

export const StoryCard = ({ story }: StoryItemProps) => {

    // Hooks
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();

    // States
    const [openDetails, setOpenDetails] = useState(false);
    const [bookImage] = useState(getRandomBookImage());

    // Handlers
    const handleOpenDetails = () => setOpenDetails(true);
    const handleCloseDetails = () => setOpenDetails(false);

    return (
        <>
            <Box
                component='article'
                sx={{
                    display: 'flex',
                    flexDirection: { xxs: 'column', md: 'row' },
                    backgroundColor: theme.button.background,
                    boxShadow: `${theme.button.boxShadow}, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;`,
                    borderRadius: 5,
                }}
            >
                {/* Image and options */}

                <Box
                    sx={{
                        p: 3,
                        display: 'flex',
                        flexDirection: { xxs: 'column', sm: 'row' },
                        gap: { width: '100%', xxs: 2, sm: 6, md: 4 },
                    }}
                >
                    {/* Image */}
                    <Box
                        sx={{
                            ml: 'auto',
                            mr: 'auto',
                            width: '100%',
                            maxWidth: '300px',
                            aspectRatio: '1 / 1',
                            position: 'relative',
                            borderRadius: 5,
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={story.cover?.url || bookImage}
                            alt={'story cover'}
                            placeholder={placeholderValue(!!story.cover?.plaiceholder)}
                            blurDataURL={story.cover?.plaiceholder || undefined}
                            fill
                        />
                    </Box>
                    {/* Divider between image and options */}
                    <Divider
                        orientation='vertical'
                        flexItem
                    />
                    <StoryOptions story={story} />
                </Box>

                {/* Divider left/right or top/buttom */}
                <Divider
                    orientation={mediaQuery.upMd ? 'vertical' : 'horizontal'}
                    flexItem
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        alignSelf: 'stretch',
                    }}
                >
                    <Box
                        sx={{
                            p: 3,
                            height: '100%',
                        }}
                    >
                        <StoryText story={story} />
                    </Box>
                    <Divider />
                    <StoryButtons
                        storyId={story.id}
                        handleOpenClickOpenDetails={handleOpenDetails}
                    />
                </Box>
            </Box>
            <StoryDetails
                story={story}
                open={openDetails}
                handleClose={handleCloseDetails}
                bookImage={bookImage}
            />
        </>
    );
};

type StoryOptionsProps = {
    story: FinishedPublicStoryPreview;
};

const StoryOptions = ({ story }: StoryOptionsProps) => {
    const theme = useTheme();
    const { t: storyInputsT } = useTranslation('story-inputs');
    const { t: publicStoriesT } = useTranslation('public-stories');

    return (
        <Box
            sx={{
                p: { xxs: 2, md: 0 },
                width: { xxs: '100%', md: 'auto' },
                minWidth: { xxs: 0, md: '200px' },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { xxs: 'center', md: 'flex-start' },
                gap: 2,
            }}
        >
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }} color={theme.text.body}>{publicStoriesT('StoryCard.option-item.author')} :</Typography>
                <Typography color={theme.text.body}>{storyInputsT(`author.item.${story.type}`)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }} color={theme.text.body}>{publicStoriesT('StoryCard.option-item.theme')} :</Typography>
                <Typography color={theme.text.body}>{storyInputsT(`theme.item.${story.options.theme}`)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }} color={theme.text.body}>{publicStoriesT('StoryCard.option-item.duration')} :</Typography>
                <Typography color={theme.text.body}>{storyInputsT(`duration.item.${story.options.duration}`)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography sx={{ fontWeight: 700 }} color={theme.text.body}>{publicStoriesT('StoryCard.option-item.language')} :</Typography>
                <Typography color={theme.text.body}>{storyInputsT(`language.item.${story.options.language}`)}</Typography>
            </Box>
        </Box>
    );
};

type StoryButtonsProps = {
    storyId: string;
    handleOpenClickOpenDetails: () => void;
};

const StoryButtons = ({ storyId, handleOpenClickOpenDetails }: StoryButtonsProps) => {
    // Hooks
    const { mediaQuery } = useAppMediaQuery();
    return (
        <Stack
            direction={{ xxs: 'column', xs: 'row' }}
            divider={
                <Divider
                    orientation={mediaQuery.upXs ? 'vertical' : 'horizontal'}
                    flexItem
                />
            }
        >
            <Button
                fullWidth
                sx={{
                    pt: 2,
                    pb: 2,
                    width: '100%',
                    height: '100%',
                    fontSize: '1.1rem',
                    fontWeight: 'blod',
                }}
                onClick={handleOpenClickOpenDetails}
            >
                Voir les détails
            </Button>
            <Button
                fullWidth
                sx={{
                    pt: 2,
                    pb: 2,
                    height: '100%',
                    fontSize: '1.1rem',
                    fontWeight: 'blod',
                }}
                component={Link}
                href={`${Path.STORY}/${storyId}`}
            >
                Lire l'histoire
            </Button>
        </Stack>
    );
};

type StoryTextProps = {
    story: FinishedPublicStoryPreview;
};

const StoryText = ({ story }: StoryTextProps) => {
    const theme = useTheme();
    return (
        <>
            <Typography
                textAlign='center'
                component={'h2'}
                variant={'h4'}
                color={theme.text.subtitle}
                sx={{
                    mt: 2,
                    position: 'relative',
                    fontWeight: 'bold',
                    '::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -3,
                        height: '3px',
                        width: '150px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: theme.palette.secondary.main,
                    },
                }}
            >
                {story.title}
            </Typography>
            <Box
                sx={{
                    mt: 6,
                    mb: 6,
                }}
            >
                <Typography
                    textAlign='center'
                    sx={{ flex: 1 }}
                    color={theme.text.body}
                >
                    {story.topic}
                </Typography>
            </Box>
        </>
    );
};
