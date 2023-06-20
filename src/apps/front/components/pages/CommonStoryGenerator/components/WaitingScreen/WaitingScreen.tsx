// Librairies
import Image from 'next/image';
// Mui
import { Box, Grid, Typography } from '@mui/material';
// App
import { useEffect, useState } from 'react';
import { useAppSelector } from '~/apps/front/hooks';
import { getRandomHourglassImage, placeholderValue } from '~/apps/front/utils';

export const WaitingScreen = () => {
    // Store
    const { data: storyData } = useAppSelector((state) => state.commonStoryBeingGenerated);

    // State
    const [timeLeft, setTimeLeft] = useState({
        m: 0,
        s: 0,
    });

    // Effects
    useEffect(() => {
        const counterInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = storyData!.startAt - now;

            if (distance <= 0) {
                clearInterval(counterInterval);
                setTimeLeft({
                    m: 0,
                    s: 0,
                });
            } else {
                setTimeLeft({
                    m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    s: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => {
            clearInterval(counterInterval);
        };
    }, [storyData]);

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
                        src={storyData?.cover?.url || getRandomHourglassImage()}
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
                    px: 4
                }}
            >
                <Typography textAlign='center'>{storyData?.topic}</Typography>
                {timeLeft.m === 0 && timeLeft.s === 0 ? (
                    <Typography>Votre histoire va commencer...</Typography>
                ) : (
                    <Typography>{`Votre histoire commencera dans:
                    ${timeLeft.m} minutes ${timeLeft.s} secondes`}</Typography>
                )}
            </Grid>
        </Grid>
    );
};
