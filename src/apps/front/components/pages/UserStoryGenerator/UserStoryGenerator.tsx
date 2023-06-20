// Librairies
import { useEffect, useRef } from 'react';
// MUI
import { Box, Container, useTheme } from '@mui/material';
//App
import { Chapter, OptionsScreen, TopicsScreen, ActionButtons, OpenaiErrorModals, EndStoryScreen } from './components';
import { LoadingContainer } from '../..';
import { useUserStoryGeneratorSocket } from './UserStoryGenerator.hooks';
import { useAppSelector } from '~/apps/front/hooks';

export const UserStoryGenerator = () => {
    // Hooks
    const lastChapterRef = useRef<HTMLDivElement>(null);
    const { isInitialized } = useUserStoryGeneratorSocket();
    const theme = useTheme();

    // Store
    const { data: storyData } = useAppSelector((state) => state.userStoryBeingGenerated);

    useEffect(() => {
        lastChapterRef.current && window.scrollTo({ top: lastChapterRef.current.offsetTop, behavior: 'smooth' });
    }, [storyData.allChapters.length]);

    return isInitialized ? (
        <>
            <Container
                maxWidth='xl'
                sx={{
                    pt: theme.main.padding,
                    pb: theme.main.padding,
                }}
            >
                {storyData.state === 'selectOptions' && <OptionsScreen />}
                {storyData.state === 'selectTopic' && <TopicsScreen />}

                {(storyData.state === 'generating' || storyData.state === 'finished') && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 12, mt: 12 }}>
                        {storyData.allChapters.map((chapter, i) => (
                            <Box
                                ref={storyData.allChapters.length === i + 1 ? lastChapterRef : null}
                                key={`story-slice${i + 1}`}
                            >
                                <Chapter
                                    chapter={chapter}
                                    chapterIndex={i}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
                {storyData.state === 'finished' && <EndStoryScreen />}
                <Box sx={{ position: 'fixed', left: '50px', top: '120px' }}>
                    <ActionButtons />
                </Box>
            </Container>
            <OpenaiErrorModals />
        </>
    ) : (
        <LoadingContainer />
    );
};
