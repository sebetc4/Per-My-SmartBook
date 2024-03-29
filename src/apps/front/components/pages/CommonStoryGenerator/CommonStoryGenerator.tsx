// Librairies
import { useEffect, useRef } from 'react';
// MUI
import { Box, Container, useTheme } from '@mui/material';
// App
import { LoadingContainer } from '../..';
import { Chapter, CommonChat, EndStoryScreen, WaitingScreen } from './components';
import { useSocketCommonSroryGenerators } from './CommonStoryGenerators.hooks';
import { useAppSelector } from '~/apps/front/hooks';

export const CommonStoryGenerator = () => {
    // Hooks
    const lastChapterRef = useRef<HTMLDivElement>(null);
    const { isInitialized } = useSocketCommonSroryGenerators();
    const theme = useTheme();

    // Store
    const { data: storyData } = useAppSelector((state) => state.commonStoryBeingGenerated);
    const { isAuth } = useAppSelector((state) => state.auth);

    useEffect(() => {
        lastChapterRef.current && window.scrollTo({ top: lastChapterRef.current.offsetTop, behavior: 'smooth' });
    }, [storyData?.allChapters.length]);

    return isInitialized && storyData ? (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            {isAuth && <CommonChat />}
            <Box
                sx={{
                    width: '100%',
                    ml: isAuth ? { xxs: 0, md: '350px', lg: '400px' } : 0,
                }}
            >
                <Container
                    maxWidth='xl'
                    sx={{
                        height: '100%',
                        width: '100%',
                        py: theme.main.padding,
                    }}
                >
                    {storyData.state === 'waiting' ? (
                        <WaitingScreen />
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {storyData.allChapters.map((chapter, i) => (
                                <Box
                                    ref={storyData!.allChapters.length === i + 1 ? lastChapterRef : null}
                                    key={`story-slice${i + 1}`}
                                >
                                    <Chapter
                                        chapter={chapter}
                                        chapterIndex={i}
                                    />
                                </Box>
                            ))}
                            {(storyData!.state === 'finished' || storyData.state === 'stopped') && <EndStoryScreen />}
                        </Box>
                    )}
                </Container>
            </Box>
        </Box>
    ) : (
        <LoadingContainer />
    );
};
