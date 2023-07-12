// Librairies
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
// MUI
import { Box, Divider, Typography, useTheme } from '@mui/material';
// App
import { TimeLeftTextTimer } from '../../../..';
import { getNextDayOrTodayAtHour } from '~/packages/functions';
import { CommonStoriesCarousel } from '..';
import { useSocketCommonStoriesSection } from './CommonStoriesSection.hooks';
import { useAppMediaQuery } from '~/apps/front/hooks';
// Image
import ImaginaryWorldBackground from 'public/images/illustrations/imaginary-world3.png';

export const CommonStoriesSection = () => {
    // Hooks
    const { t: newStoryT } = useTranslation('new-story');
    const theme = useTheme();
    const { commonStoriesPreviews } = useSocketCommonStoriesSection();
    const { mediaQuery } = useAppMediaQuery();

    return (
        <Box
            component='section'
            sx={{
                p: {xxs: 4, sm: 8},
                boxShadow: theme.papel.boxShadow,
                backgroundColor: theme.papel.backgroundColor,
                borderRadius: { xxs: 5, md: 0 },
            }}
        >
            <Typography
                variant='h2'
                component='h2'
                textAlign='center'
                color={theme.text.title}
                sx={{px: { ssx: 0, md: 8 }}}
            >
                {newStoryT('CommonStoriesSection.title.h2')}
            </Typography>
            <Divider sx={{ my: { xxs: 4, md: 8 } }} />
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
            <Divider sx={{ my: { xxs: 4, md: 8 } }} />
            {commonStoriesPreviews.length > 0 ? (
                <CommonStoriesCarousel commonStoriesPreviews={commonStoriesPreviews} />
            ) : (
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: { xxs: 'none', sm: '7/4' },
                        width: '100%',
                        height: 'auto',
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: { xxs: 'none', sm: theme.card.backgroundColor },
                            boxShadow: { xxs: 'none', sm: theme.card.boxShadow },
                            borderRadius: { xxs: 0, sm: 6 },
                            p: { xxs: 0, sm: 4 , md: 6},
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
                    {mediaQuery.upSm && (
                        <>
                            <Image
                                src={ImaginaryWorldBackground}
                                alt='Imaginary world background'
                                placeholder='blur'
                                fill
                                style={{
                                    zIndex: 0,
                                    opacity: 0.6,
                                }}
                                quality={100}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    zIndex: 1,
                                    boxShadow: `inset 0px 0px 40px 10px ${theme.card.backgroundColor}`,
                                }}
                            />
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
};
