import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Box, Divider, Typography, useTheme } from '@mui/material';

import { TimeLeftTextTimer } from '../../../..';
import { getNextDayOrTodayAtHour } from '../../../../../../../packages/functions';
import { CommonStoryBeingGeneratedPreview, SocketEvent, SocketNamespace } from '../../../../../../../packages/types';
import { sockets } from '../../../../../../../services';
import { CommonStoriesCarousel } from '..';

import ImaginaryWorldBackground from '../../../../../../../../public/images/illustrations/imaginary-world3.png';

export const CommonStoriesSection = () => {
    // Hooks
    const router = useRouter();
    const { t: newStoryT } = useTranslation('new-story');
    const theme = useTheme()

    // States
    const [commonStoriesPreviews, setCommonStoriesPreviews] = useState<CommonStoryBeingGeneratedPreview[]>([]);

    // Effects
    useEffect(() => {
        const fetchCommonStoriesTopics = async () => {
            const body = { language: router.locale };
            const { allStoriesTopics } = await sockets.emit(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.GET_ALL_COMMON_STORIES_BEING_GENERATED_PREVIEWS,
                body
            );
            setCommonStoriesPreviews(allStoriesTopics);
        };
        fetchCommonStoriesTopics();
    }, [router.locale]);

    return (
        <Box
            component='section'
            sx={{
                p: { xxs: 2, md: 8 },
                boxShadow: { xxs: '0 0 10px rgba(0,0,0,0.3), 0 0 300px 25px rgba(222,198,122,0.7) inset', md: 'none' },
            }}
        >
            <Typography
                variant='h2'
                component='h2'
                textAlign='center'
                color={theme.text.title}
                sx={{
                    pl:{ ssx: 4, md: 8},
                    pr: { ssx: 4, md: 8},
                }}
            >
                {newStoryT('CommonStoriesSection.title.h2')}
            </Typography>
            <Divider
                sx={{
                    mt: { xxs: 2, md: 8 },
                    mb: { xxs: 2, md: 8 },
                }}
            />
            <Typography
            color={theme.text.body}
                variant='body1'
                sx={{
                    maxWidth: '600px',
                    textAlign: 'center',
                    ml: 'auto',
                    mr: 'auto',
                }}
            >
                {newStoryT('CommonStoriesSection.text')}
            </Typography>
            <Divider
                sx={{
                    mt: { xxs: 2, md: 8 },
                    mb: { xxs: 2, md: 8 },
                }}
            />

            {commonStoriesPreviews.length > 0 ? (
                <CommonStoriesCarousel commonStoriesPreviews={commonStoriesPreviews} />
            ) : (
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: '7/4',
                        width: '100%',
                        height: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: theme.card.backgroundColor,
                            boxShadow: theme.card.boxShadow,
                            borderRadius: 6,
                            p: {xxs:2, md: 6},
                            zIndex: 10,
                        }}
                    >
                        <TimeLeftTextTimer
                            endAt={getNextDayOrTodayAtHour(18).getTime()}
                            text={newStoryT('CommonStoriesSection.wait-common-story-timer.text')}
                            textSx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}
                            endText={newStoryT('CommonStoriesSection.wait-common-story-timer.endText')}
                            withHours
                            timeSx={{
                                textAlign: 'center',
                                mt: 2,
                            }}
                        />
                    </Box>
                    <Image
                        src={ImaginaryWorldBackground}
                        alt='Imaginary world background'
                        placeholder='blur'
                        fill
                        style={{
                            zIndex: 0,
                            opacity: 0.6,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 1,
                            boxShadow: `inset 0px 0px 40px 10px ${theme.card.backgroundColor}`,
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};
