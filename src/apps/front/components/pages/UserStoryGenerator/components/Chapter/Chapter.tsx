// Librairies
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Divider, LinearProgress, Stack, Typography, useTheme } from '@mui/material';
// Api
import { toRoman } from '~/packages/functions';
import { ChapterChoiceButton } from '../../../..';
import { selectUserStoryStoryChapterChoice } from '~/store';
// Types
import type { UserStoryChapterWithImageOnClient } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { getRandomHourglassImage, placeholderValue } from '~/apps/front/utils';
import { useState } from 'react';

type ChapterProps = {
    chapter: UserStoryChapterWithImageOnClient;
    chapterIndex: number;
};

export const Chapter = ({ chapter, chapterIndex }: ChapterProps) => {
    // Hooks
    const { t: storyGeneratorT } = useTranslation('story-generator');
    const dispatch = useAppDispatch();

    // Store
    const { isLoading, data: storyData } = useAppSelector((state) => state.userStoryBeingGenerated);

    // State
    const [hourglassImage] = useState(getRandomHourglassImage());

    const handleClickOnChoice = async (selectedChoiceIndex: number) => {
        dispatch(selectUserStoryStoryChapterChoice(selectedChoiceIndex));
    };

    return (
        <Box
            sx={{
                ml: 'auto',
                mr: 'auto',
                border: '1px solid #c2b5a3',
                background: '#fafafa',
                boxShadow:
                    '0 0 10px rgba(0,0,0,0.3), 0 0 300px 25px rgba(222,198,122,0.7) inset, inset -7px 0 30px -7px rgba(0,0,0,.4)',
                display: 'flex',
                p: {xxs: 2, sm: 8},
                flexDirection: 'column',
                alignItems: 'center',
            }}
            component='section'
        >
            <Typography
                textAlign='center'
                component='h2'
                variant='h2'
                sx={{
                    m: {xxs: 2, xs: 4},
                }}
            >{`${storyGeneratorT('Chapter.title.h2.chapter')} ${toRoman(chapterIndex + 1)}: ${chapter.title}`}</Typography>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '512px',
                    aspectRatio: '1 / 1',
                }}
            >
                <Image
                    src={chapter.image?.url || hourglassImage}
                    alt={chapter.description}
                    placeholder={placeholderValue(!!chapter.image?.plaiceholder)}
                    blurDataURL={chapter.image?.plaiceholder || undefined}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </Box>
            <Typography
                textAlign='center'
                sx={{
                    m: 4,
                    mx: {xxs: 0, xs: 4},
                    fontSize: '1.2rem',
                }}
            >
                {chapter.text}
            </Typography>
            {chapter.allChoices && (
                <>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', width: '100%', mb: 4 }}>
                            <Box
                                sx={{
                                    flex: 1,
                                }}
                            >
                                <LinearProgress variant='indeterminate' color='secondary' />
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    transform: 'rotate(180deg)',
                                }}
                            >
                                <LinearProgress variant='indeterminate' color='secondary' />
                            </Box>
                        </Box>
                    ) : (
                        <Divider
                            flexItem
                            sx={{ mb: 4 }}
                        />
                    )}
                    <Stack
                        direction={{ xxs: 'column', md: 'row' }}
                        spacing={8}
                        alignItems='stretch'
                        sx={{ px: 4 }}
                    >
                        {chapter.allChoices.map((choice, i) => (
                            <ChapterChoiceButton
                                key={`history-chapter-1-choice-${i + 1}`}
                                choice={choice}
                                isLoading={isLoading}
                                isCurrentChapter={storyData?.currentStep === chapterIndex + 1}
                                choiceIsSelected={chapter.selectedChoiceIndex !== undefined}
                                isSelectedChoice={chapter.selectedChoiceIndex === i}
                                onClick={() => handleClickOnChoice(i)}
                            />
                        ))}
                    </Stack>
                    <Divider
                        flexItem
                        sx={{ mt: 4 }}
                    />
                </>
            )}
        </Box>
    );
};
