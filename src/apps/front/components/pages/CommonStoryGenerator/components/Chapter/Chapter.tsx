import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Box, Divider, LinearProgress, Stack, Typography } from '@mui/material';

import { toRoman } from '~/packages/functions';
import { selectCommonStoryStoryChapterChoice } from '~/store';

import { commonStoryChapterDurationSeconds } from '~/packages/constants';

import { CommonStoryChapterClientData } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { getRandomHourglassImage, placeholderValue } from '~/apps/front/utils';
import { ChapterChoiceButton } from '~/apps/front/components/buttons/ChapterChoiceButton/ChapterChoiceButton';

type ChapterProps = {
    chapter: CommonStoryChapterClientData;
    chapterIndex: number;
};

export const Chapter = ({ chapter, chapterIndex }: ChapterProps) => {
    // Hooks
    const dispatch = useAppDispatch();
    const { t: storyGeneratorT } = useTranslation('story-generator');

    //Store
    const { isLoading, data: storyData } = useAppSelector((state) => state.commonStoryBeingGenerated);

    // State
    const [userVoteIndex, setUserVoteIndex] = useState<number | undefined>(undefined);
    const [hourglassImage] = useState(getRandomHourglassImage());

    const handleClickOnChoice = async (selectedChoiceIndex: number) => {
        dispatch(selectCommonStoryStoryChapterChoice(selectedChoiceIndex));
        setUserVoteIndex(selectedChoiceIndex);
    };

    return (
        <Box
            sx={{ mt: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            component='section'
        >
            <Typography
                textAlign='center'
                component='h2'
                variant='h2'
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
                    mt: 6,
                    mb: 6,
                    fontSize: '1.2rem',
                }}
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
                        sx={{ pl: 4, pr: 4 }}
                    >
                        {chapter.allChoices.map((choice, i) => (
                            <ChapterChoiceButton
                                key={`chapter-choice-${i}`}
                                choice={choice}
                                choiceIndex={i}
                                isLoading={isLoading}
                                disabled={storyData?.state !== 'generating'}
                                isCurrentChapter={storyData?.currentStep === chapterIndex + 1}
                                choiceIsSelected={chapter.selectedChoiceIndex !== undefined}
                                isSelectedChoice={chapter.selectedChoiceIndex === i}
                                userHasVoted={userVoteIndex !== undefined}
                                isUserVote={userVoteIndex === i}
                                userVoteIsSelectedChoice={userVoteIndex === chapter.selectedChoiceIndex}
                                withCheckedIcon
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
