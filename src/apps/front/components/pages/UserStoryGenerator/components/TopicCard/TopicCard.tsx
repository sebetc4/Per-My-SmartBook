// Libraries
import { useRef, useState } from 'react';
import Image from 'next/image';
// MUI
import { Box, LinearProgress, Typography, useTheme } from '@mui/material';
// App
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

    // State
    const [hourglassImage] = useState(getRandomHourglassImage());

    return (
        <Box
            ref={cardRef}
            onClick={onClick}
            sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                p: { xxs: 0, xs: 2 },
                cursor: isLoading ? 'default' : 'pointer',
                backgroundColor: theme.button.backgroundColor,
                boxShadow: theme.button.boxShadow,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': !isLoading
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
                        maxWidth: '350px',
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
                        src={topic.imageUrl ? topic.imageUrl : hourglassImage}
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
                            p: 2,
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
