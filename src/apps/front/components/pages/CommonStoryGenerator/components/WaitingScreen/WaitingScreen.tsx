// Librairies
import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
// Mui
import { Box, Grid, Typography, useTheme } from '@mui/material';
// App
import { useAppSelector } from '~/apps/front/hooks';
import { getRandomHourglassImage, placeholderValue } from '~/apps/front/utils';
import { TimeLeftTextTimer } from '~/apps/front/components/timer/TimeLeftTextTimer/TimeLeftTextTimer';

export const WaitingScreen = () => {
    // Hooks
    const { t: storyGeneratorT } = useTranslation('story-generator');
    const theme = useTheme()

    // Store
    const { data: storyData } = useAppSelector((state) => state.commonStoryBeingGenerated);

    const [hourglassImage] = useState(getRandomHourglassImage());

    return (
        <Grid
            container
            columnSpacing={6}
            sx={{ height: '100%' }}
        >
            <Grid
                item
                xxs={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '512px',
                        aspectRatio: '1 / 1',
                    }}
                >
                    <Image
                        src={storyData?.cover?.url || hourglassImage}
                        alt={"Couverture de l'histoire"}
                        placeholder={placeholderValue(!!storyData?.cover?.plaiceholder)}
                        blurDataURL={storyData?.cover?.plaiceholder}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                    />
                </Box>
            </Grid>
            <Grid
                item
                xxs={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    px: 4,
                }}
            >
                <Typography textAlign='center' color={theme.text.body}>{storyData?.topic}</Typography>

                <TimeLeftTextTimer
                    boxTextSX={{ display: 'flex', gap: 1 }}
                    text={storyGeneratorT('WaitingScreen.text.story-begins-in')}
                    textSx={{ fontWeight: 'bold' }}
                    endText={storyGeneratorT('WaitingScreen.text.story-about-begin')}
                    endTextSx={{ fontWeight: 'bold' }}
                    endAt={storyData!.startAt}
                    timeSx={{ fontWeight: 'bold' }}
                />
            </Grid>
        </Grid>
    );
};
