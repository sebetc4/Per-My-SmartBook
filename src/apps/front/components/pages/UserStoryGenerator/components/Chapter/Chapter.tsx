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

type ChapterProps = {
    chapter: UserStoryChapterWithImageOnClient;
    chapterIndex: number;
};

export const Chapter = ({ chapter, chapterIndex }: ChapterProps) => {
    // Hooks
    const { t } = useTranslation('story-generator');
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const { isLoading, data: storyData } = useAppSelector((state) => state.userStoryBeingGenerated);

    const handleClickOnChoice = async (selectedChoiceIndex: number) => {
        dispatch(selectUserStoryStoryChapterChoice(selectedChoiceIndex));
    };

    return (
        <Box
            sx={{
                maxWidth: '12000px',
                ml: 'auto',
                mr: 'auto',
                border: '1px solid #c2b5a3',
                background: '#fafafa',
                boxShadow:
                    '0 0 10px rgba(0,0,0,0.3), 0 0 300px 25px rgba(222,198,122,0.7) inset, inset -7px 0 30px -7px rgba(0,0,0,.4)',
                display: 'flex',
                p: 8,
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
                    m: 4,
                }}
            >{`${t('Chapter.title.h2.chapter')} ${toRoman(chapterIndex + 1)}: ${chapter.title}`}</Typography>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '512px',
                    aspectRatio: '1 / 1',
                }}
            >
                <Image
                    src={chapter.image?.url || getRandomHourglassImage()}
                    alt={chapter.description}
                    placeholder={placeholderValue(!!chapter.image?.plaiceholder)}
                    blurDataURL={chapter.image?.plaiceholder || undefined}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </Box>
            <Typography
                maxWidth='md'
                textAlign='center'
                sx={{
                    m: 6,
                    fontSize: '1.2rem',
                }}
            >
                {chapter.text}
            </Typography>
            {chapter.allChoices && (
                <>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', width: '100%, mb: 4' }}>
                            <Box
                                sx={{
                                    flex: 1,
                                }}
                            >
                                <LinearProgress variant='indeterminate' />
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    transform: 'rotate(180deg)',
                                }}
                            >
                                <LinearProgress variant='indeterminate' />
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
                        spacing={4}
                        alignItems='stretch'
                        sx={{ pl: 2, pr: 2 }}
                    >
                        {chapter.allChoices.map((choice, i) => (
                            <ChapterChoiceButton
                                key={`history-chapter-1-choice-${i + 1}`}
                                choiceIndex={i}
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
