// Librairies
import { useEffect, useRef, useState } from 'react';
// MUI
import { Box, Container, useTheme } from '@mui/material';
// App
import { LoadingContainer } from '../..';
import { Chapter, CommonChat, EndStoryScreen, WaitingScreen } from './components';
import { useSocketCommonSroryGenerators } from './CommonSroryGenerators.hooks';
import { useAppSelector } from '~/apps/front/hooks';

export const CommonStoryGenerator = () => {
    // Hooks
    const lastChapterRef = useRef<HTMLDivElement>(null);
    const { isInitialized } = useSocketCommonSroryGenerators();
    const theme = useTheme();

    // Store
    const { data: storyData } = useAppSelector((state) => state.commonStoryBeingGenerated);
    const { layout } = useAppSelector((state) => state.app);

    // State 
    const [chatPaddingBottom, setChatPaddingBottom] = useState(0);

    useEffect(() => {
        lastChapterRef.current && window.scrollTo({ top: lastChapterRef.current.offsetTop, behavior: 'smooth' });
    }, [storyData?.allChapters.length]);

    useEffect(() => {
        addEventListener('scroll', (e) => {
            const scrollBottomPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            const footerHeight = layout.footerHeight;
            const PaddingBottom = footerHeight + scrollBottomPosition - pageHeight;
            if (PaddingBottom > 0) {
                setChatPaddingBottom(PaddingBottom);
            }
        });
    }, [layout.footerHeight]);

    return isInitialized ? (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <CommonChat paddingBottom={chatPaddingBottom}/>
            <Box sx={{ width: '100%', ml: '400px' }}>
                <Container
                    maxWidth='xl'
                    sx={{
                        height: '100%',
                        width: '100%',
                        pt: theme.main.padding,
                        pb: theme.main.padding,
                    }}
                >
                    {storyData!.state === 'waiting' ? (
                        <WaitingScreen />
                    ) : (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {storyData!.allChapters.map((chapter, i) => (
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
                            {storyData!.state === 'finished' || (storyData!.state === 'stopped' && <EndStoryScreen />)}
                        </Box>
                    )}
                </Container>
            </Box>
        </Box>
    ) : (
        <LoadingContainer />
    );
};
