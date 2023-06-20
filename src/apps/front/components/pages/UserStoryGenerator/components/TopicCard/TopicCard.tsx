import { useRef } from 'react';
import Image from 'next/image';

import { Box, LinearProgress, Typography, useTheme } from '@mui/material';
import { UserStoryTopic } from '~/packages/types';
import { getRandomHourglassImage } from '~/apps/front/utils';



type TopicCardProps = {
    topic: UserStoryTopic;
    onClick: () => void;
    isLoading: boolean;
    isSelected: boolean;
    topicIsSelected: boolean;
};

export const TopicCard = ({ topic, onClick, isLoading, isSelected, topicIsSelected }: TopicCardProps) => {
    // Hooks
    const theme = useTheme();
    const cardRef = useRef<HTMLElement>(null);

    return (
        <Box
            ref={cardRef}
            onClick={onClick}
            sx={{
                position: 'relative',
                maxWidth: '100%',
                width: '400px',
                p: {xxs: 0, xs: 2},
                cursor: isLoading ? 'default' : 'pointer',
                backgroundColor: theme.button.background,
                boxShadow: theme.button.boxShadow,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover':
                    !isLoading || topicIsSelected
                        ? {
                              transform: 'scale(1.02)',
                              boxShadow: `${theme.button.boxShadowHover}, `,
                          }
                        : {},
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    filter: isLoading && topicIsSelected && !isSelected ? 'blur(2px)' : 'none',
                    boxShadow: isSelected ? theme.button.boxShadow : theme.button.boxShadowSelected,
                }}
            >
                <Box
                    sx={{
                        m: 2,
                        maxWidth: '100%',
                        height: '350px',
                        position: 'relative',
                        aspectRatio: '1/1',
                    }}
                >
                    {isSelected && (
                        <>
                            <LinearProgress sx={{ position: 'absolute', top: -6, left: 0, width: '100%' }} />
                            <LinearProgress sx={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }} />
                        </>
                    )}
                    <Image
                        src={topic.imageUrl ? topic.imageUrl : getRandomHourglassImage()}
                        alt={topic.description}
                        fill
                        sizes='width 400px'
                        style={{
                            borderRadius: '12px',
                            objectFit: 'cover',
                        }}
                        quality={100}
                    />
                </Box>
                <Box
                    sx={{
                        m: 2,
                        mb: 0,
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        textAlign='center'
                        color={theme.text.body}
                        sx={{
                            p:2,
                            fontSize: '1.2rem',
                        }}
                    >
                        {topic.text}
                    </Typography>
                </Box>
            </Box>
            {isLoading && topicIsSelected && !isSelected && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(196, 196, 196, 0.7)',
                        borderRadius: 2,
                        zIndex: 2,
                    }}
                ></Box>
            )}
        </Box>
    );
};
