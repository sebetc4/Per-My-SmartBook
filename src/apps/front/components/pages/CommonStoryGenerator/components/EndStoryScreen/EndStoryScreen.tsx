// MUI
import { Box, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// App
import { useAppSelector, useTimeLeftTimer } from '~/apps/front/hooks';
import { Path } from '~/packages/types';

export const EndStoryScreen = () => {
    // Hooks
    const { t: dateT } = useTranslation('date');
    const { t: storyGenerationT } = useTranslation('story-generator');
    const theme = useTheme();
    const router = useRouter();

    // Store
    const { data: storyData } = useAppSelector((state) => state.commonStoryBeingGenerated);

    const { timeLeft } = useTimeLeftTimer(storyData!.deletedAt!);

    useEffect(() => {
        timeLeft.isFinished && router.push(Path.NEW_STORY);
    }, [timeLeft.isFinished]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {storyData!.state === 'stopped' ? (
                <Typography
                    color={theme.text.body}
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                    }}
                >
                    {storyGenerationT('EndStoryScreen.text.story-is-stopped')}
                </Typography>
            ) : (
                <Typography
                    variant='h2'
                    component='h2'
                    color={theme.text.body}
                >
                    {storyGenerationT('FinishedStory.text.end')}
                </Typography>
            )}
            <Typography color={theme.text.body}>{`${storyGenerationT('EndStoryScreen.text.redirect')} ${
                timeLeft.m
            } ${dateT('time.minutes')} ${timeLeft.s} ${dateT('time.seconds')}`}</Typography>
        </Box>
    );
};
