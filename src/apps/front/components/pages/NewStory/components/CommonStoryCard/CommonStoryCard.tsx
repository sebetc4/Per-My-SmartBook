// Librairies
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
// App
import { getRandomHourglassImage, placeholderValue } from '../../../../../utils';
import { TimeLeftTextTimer } from '../../../..';

import { CommonStoryBeingGeneratedPreview, Path } from '../../../../../../../packages/types';

type CommonStoryBeingGeneratedCardProps = {
    story: CommonStoryBeingGeneratedPreview;
};

export const CommonStoryCard = ({ story }: CommonStoryBeingGeneratedCardProps) => {
    // Hooks
    const { t: newStoryT } = useTranslation('new-story');
    const { t: storyInputsT } = useTranslation('story-inputs');
    const theme = useTheme();

    // State
    const [storyEndString, setStoryEndString] = useState<string>('');

    useEffect(() => {
        switch (story.state) {
            case 'stopped':
                setStoryEndString(newStoryT('CommonStoryCard.timer.endText.stopped'));
                break;
            case 'finished':
                setStoryEndString(newStoryT('CommonStoryCard.timer.endText.finished'));
                break;
            default:
                setStoryEndString(newStoryT('CommonStoryCard.timer.endText.generating'));
        }
    }, [story.state, newStoryT]);

    return (
        <Box
            component={Link}
            href={`${Path.COMMON_STORY_GENERATOR}?id=${story.id}`}
            sx={{
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            <Box
                component='article'
                sx={{
                    maxWidth: '350px',
                    borderRadius: 6,
                    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
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
                        src={story.cover?.url || getRandomHourglassImage()}
                        placeholder={placeholderValue(!!story.cover?.plaiceholder)}
                        blurDataURL={story.cover?.plaiceholder}
                        alt={"Illustration de l'histoire"}
                        fill
                    />
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        mt: -4,
                        borderTopLeftRadius: 32,
                        p: 4,
                        pt: 0,
                        backgroundColor: theme.card.backgroundColor,
                        zIndex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <TimeLeftTextTimer
                                endAt={story.startAt}
                                text={newStoryT('CommonStoryCard.timer.text')}
                                textSx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                                boxTextSX={{ display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 1 }}
                                endText={storyEndString}
                                endTextSx={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            />
                        </Box>
                    </Box>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Stack direction='row' spacing={1}>
                        <Typography color={theme.text.body} sx={{ fontWeight: 'bold' }}>{`${newStoryT('CommonStoryCard.text.theme')}`}</Typography>
                        <Typography color={theme.text.body}>{`${storyInputsT(`theme.item.${story.theme}`)}`}</Typography>
                    </Stack>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Box>
                        <Typography
                            textAlign='justify'
                            sx={{ mt: 1 }}
                            color={theme.text.body}
                        >
                            {story.topic}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
