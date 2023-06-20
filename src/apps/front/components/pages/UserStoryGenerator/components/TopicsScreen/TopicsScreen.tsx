// Librairies
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// MUI
import { Container, Typography, Box, useTheme} from '@mui/material';
// App
import { selectUserStoryTopic } from '~/store';
import { TopicCard } from '..';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';

export const TopicsScreen = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const theme = useTheme()
    const { t } = useTranslation('story-generator');

    // Store
    const { isLoading, data: storyData } = useAppSelector((state) => state.userStoryBeingGenerated);

    // State
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

    // Handlers
    const handleClickOnTopic = async (selectedTopicIndex: number) => {
        if (!isLoading) {
            setSelectedTopic(selectedTopicIndex);
            dispatch(selectUserStoryTopic(selectedTopicIndex));
        }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                component='h1'
                variant='h2'
                color={theme.text.title}
            >
                {t('TopicsScreen.title.h1')}
            </Typography>
            <Box sx={{ mt: 8, mb: 8, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
                {storyData.allTopics?.map((topic, i) => (
                    <TopicCard
                        key={`topic-${i + 1}`}
                        topic={topic}
                        onClick={() => handleClickOnTopic(i)}
                        isLoading={isLoading}
                        isSelected={i === selectedTopic}
                        topicIsSelected={typeof selectedTopic === 'number'}
                    />
                ))}
            </Box>
        </Container>
    );
};



