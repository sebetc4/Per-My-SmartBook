// MUI
import { Box, Container, Fab, useTheme } from '@mui/material';
import Image from 'next/image';
import { BackgroundPaper, CommonStoriesSection, UserStorySection } from './components';
// App
import { sockets } from '../../../../../services';
import { ColorMode, SocketEvent, SocketNamespace } from '~/packages/types';
import { enableCommonStoryDevMode } from '~/packages/constants';
import { useAppMediaQuery, useAppSelector } from '~/apps/front/hooks';
import { LoadingContainer } from '../..';
// Images
import HeroImage from 'public/images/illustrations/hero-stories.png';
import HeroImageDark from 'public/images/illustrations/hero-stories-dark.png';

export const NewStory = () => {
    // Hooks
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();

    // Store
    const { colorMode } = useAppSelector((state) => state.app);

    return (
        <Container
            maxWidth='xl'
            sx={{
                py: theme.main.padding,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
            }}
        >
            {/* Banner */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '900px',
                    aspectRatio: '16/9',
                    position: 'relative',
                }}
            >
                {colorMode === ColorMode.LIGHT ? (
                    <Image
                        src={HeroImage}
                        alt='hero illustration'
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        fill
                        quality={100}
                    />
                ) : (
                    <>
                        <Image
                            src={HeroImageDark}
                            alt='hero illustration'
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            fill
                            quality={100}
                            placeholder='blur'
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                inset: 0,
                                zIndex: 1,
                                boxShadow: `inset 0px 0px 60px 100px ${theme.main.background}`,
                            }}
                        />
                    </>
                )}
            </Box>

            {/* Common stories */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '900px',
                    pl: { xxs: 0, md: 8 },
                    pr: { xxs: 0, md: 8 },
                }}
            >
                {mediaQuery.upMd ? (
                    <BackgroundPaper withImage>
                        <CommonStoriesSection />
                    </BackgroundPaper>
                ) : (
                    <CommonStoriesSection />
                )}
            </Box>

            {/* User story */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '900px',
                    pl: { xxs: 0, md: 8 },
                    pr: { xxs: 0, md: 8 },
                }}
            >
                {mediaQuery.upMd ? (
                    <BackgroundPaper>
                        <UserStorySection />
                    </BackgroundPaper>
                ) : (
                    <UserStorySection />
                )}
            </Box>
            {enableCommonStoryDevMode && (
                <Fab
                    variant='extended'
                    color='primary'
                    aria-label='add'
                    onClick={() => sockets.emit(SocketNamespace.COMMON_STORIES, SocketEvent.START_COMMON_STORY)}
                >
                    Commencer une nouvelle histoire commune
                </Fab>
            )}
        </Container>
    )
};
