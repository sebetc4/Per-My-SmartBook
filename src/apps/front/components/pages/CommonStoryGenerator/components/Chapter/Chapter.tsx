// Librairies
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Divider, LinearProgress, Stack, Typography, useTheme } from '@mui/material';
// App
import { toRoman } from '~/packages/functions';
import { selectCommonStoryStoryChapterChoice } from '~/store';
import { commonStoryChapterDurationSeconds } from '~/packages/constants';
import { CommonStoryChapterClientData } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { getRandomHourglassImage, placeholderValue } from '~/apps/front/utils';
import { ChapterChoiceButton } from '~/apps/front/components';

type ChapterProps = {
    chapter: CommonStoryChapterClientData;
    chapterIndex: number;
};

export const Chapter = ({ chapter, chapterIndex }: ChapterProps) => {
    // Hooks
    const dispatch = useAppDispatch();
    const theme = useTheme()
    const { t: storyGeneratorT } = useTranslation('story-generator');

    //Store
    const { isLoading, data: storyData } = useAppSelector((state) => state.commonStoryBeingGenerated);
    const { isAuth } = useAppSelector((state) => state.auth);

    // State
    const [userVoteIndex, setUserVoteIndex] = useState<number | undefined>(undefined);
    const [hourglassImage] = useState(getRandomHourglassImage());

    const handleClickOnChoice = async (selectedChoiceIndex: number) => {
        dispatch(selectCommonStoryStoryChapterChoice(selectedChoiceIndex));
        setUserVoteIndex(selectedChoiceIndex);
    };

    return (
        <Box
            sx={{
                ml: 'auto',
                mr: 'auto',
                border: '1px solid #c2b5a3',
                background: theme.papel.backgroundColor,
                boxShadow: theme.papel.boxShadow,
                display: 'flex',
                p: { xxs: 2, sm: 8 },
                flexDirection: 'column',
                alignItems: 'center',
            }}
            component='section'
        >
            <Typography
                textAlign='center'
                component='h2'
                variant='h2'
                color={theme.text.title}
                sx={{
                    mb: 6,
                }}
            >{`${storyGeneratorT('Chapter.title.h2.chapter')} ${toRoman(chapterIndex + 1)}: ${
                chapter.title
            }`}</Typography>
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
                    blurDataURL={chapter.image?.plaiceholder}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </Box>
            <Typography
                maxWidth='md'
                textAlign='center'
                sx={{
                    my: 6,
                    fontSize: '1.2rem',
                }}
                color={theme.text.body}
            >
                {chapter.text}
            </Typography>
            {chapter.allChoices && (
                <>
                    {storyData?.state !== 'generating' || storyData.currentStep !== chapterIndex + 1 ? (
                        <Divider
                            flexItem
                            sx={{ mb: 4 }}
                        />
                    ) : (
                        <ChapterTimer chapter={chapter} />
                    )}
                    <Stack
                        direction={{ xxs: 'column', md: 'row' }}
                        spacing={8}
                        alignItems='stretch'
                        sx={{ px: 4 }}
                    >
                        {chapter.allChoices.map((choice, i) => (
                            <ChapterChoiceButton
                                key={`chapter-choice-${i}`}
                                choice={choice}
                                isLoading={isLoading}
                                disabled={storyData?.state !== 'generating' || !isAuth}
                                isCurrentChapter={storyData?.currentStep === chapterIndex + 1}
                                choiceIsSelected={chapter.selectedChoiceIndex !== undefined}
                                isSelectedChoice={chapter.selectedChoiceIndex === i}
                                userHasVoted={userVoteIndex !== undefined}
                                isUserVote={userVoteIndex === i}
                                userVoteIsSelectedChoice={userVoteIndex === chapter.selectedChoiceIndex}
                                withCheckedIcon
                                withNotConnectedTooltip={
                                    !isAuth &&
                                    storyData?.currentStep === chapterIndex + 1 &&
                                    storyData?.state === 'generating'
                                }
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

type Timer = {
    secondLeft: number;
    progress: number;
};

const initialTimer: Timer = {
    secondLeft: 0,
    progress: 0,
};

const ChapterTimer = ({ chapter }: { chapter: CommonStoryChapterClientData }) => {
    // State
    const [timer, setTimer] = useState<Timer>(initialTimer);
    const { secondLeft, progress } = timer;

    useEffect(() => {
        if (chapter.endAt) {
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const distance = chapter.endAt! - now;
                const progress = Math.round(
                    100 +
                        (commonStoryChapterDurationSeconds - (chapter.endAt! - now)) /
                            (commonStoryChapterDurationSeconds * 10)
                );
                if (distance <= 0) {
                    clearInterval(timer);
                    setTimer({
                        secondLeft: 0,
                        progress: 100,
                    });
                } else {
                    setTimer({
                        secondLeft: Math.floor((distance % (1000 * 60)) / 1000),
                        progress,
                    });
                }
            }, 1000);
            return () => {
                chapter.endAt && clearInterval(timer);
            };
        }
    }, [chapter]);

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                mb: 3,
            }}
        >
            <Box
                sx={{
                    flex: 1,
                }}
            >
                <LinearProgress
                    variant={progress === 100 ? 'indeterminate' : 'determinate'}
                    value={progress}
                    color='secondary'
                />
            </Box>

            {progress !== 100 && (
                <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                        pr: 2,
                        pl: 2,
                    }}
                >
                    {`${secondLeft} s`}
                </Typography>
            )}

            <Box
                sx={{
                    flex: 1,
                    transform: 'rotate(180deg)',
                }}
            >
                <LinearProgress
                    variant={progress === 100 ? 'indeterminate' : 'determinate'}
                    value={progress}
                    color='secondary'
                />
            </Box>
        </Box>
    );
};
