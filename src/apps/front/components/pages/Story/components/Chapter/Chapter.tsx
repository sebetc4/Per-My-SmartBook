//Librairies
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useState } from 'react';
// MUI
import { Box, Grid, Typography, useTheme } from '@mui/material';
// App
import { FinishedStoryChapterWithImageOnClient } from '~/packages/types';
import { toRoman } from '~/packages/functions';
import { getRandomBookImage, placeholderValue } from '~/apps/front/utils';

type ChapterProps = {
    chapter: FinishedStoryChapterWithImageOnClient;
    chapterIndex: number;
};

export const Chapter = ({ chapter, chapterIndex }: ChapterProps) => {
    // Hooks
    const { t: storyT } = useTranslation('story');
    const theme = useTheme();

    // State
    const [bookImage] = useState(getRandomBookImage());

    return (
        <Box
            component='section'
            sx={{
                position: 'relative',
                height: '100%',
                border: '1px solid #c2b5a3',
                background: theme.papel.backgroundColor,
                boxShadow: theme.papel.boxShadow,
                py: 8,
                px: {xxs: 2, sm: 8},
            }}
        >
            <Typography
                textAlign='center'
                component='h2'
                variant='h3'
                color={theme.text.title}
            >{`${storyT('Chapter.title.h2.chapter')} ${toRoman(chapterIndex + 1)}: ${chapter.title}`}</Typography>
            <Box
                sx={{
                    ml: 'auto',
                    mr: 'auto',
                    mt: 6,
                    mb: 6,
                    position: 'relative',
                    width: '100%',
                    maxWidth: '512px',
                    aspectRatio: '1 / 1',
                    borderRadius: 2,
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={chapter.image?.url || bookImage}
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
                color={theme.text.body}
                sx={{
                    mt: 4,
                    mb: 2,
                    fontSize: '1.2rem',
                }}
            >
                {chapter.text}
            </Typography>
            {chapter.allChoices && (
                <>
                    <Grid
                        container
                        columnSpacing={4}
                        sx={{
                            width: '100%',
                            mt: 4
                        }}
                    >
                        {chapter.allChoices.map((choice, choiceIndex) => (
                            <Grid
                                item
                                xxs={12}
                                md={4}
                                key={`choice-${choiceIndex}`}
                            >
                                <Typography
                                    color={theme.text.body}
                                    textAlign='center'
                                    sx={{
                                        p: {xxs:2, sm: 4},
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 4,
                                        boxShadow:
                                            chapter.selectedChoiceIndex == choiceIndex
                                                ? `0px 5px 15px 3px  ${theme.palette.primary.main}`
                                                : '',
                                    }}
                                >
                                    {choice.text}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
            <Typography
                color={theme.text.body}
                sx={{
                    position: 'absolute',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    bottom: '50px',
                    right: '30px',
                }}
            >
                {`p.${chapterIndex + 2}`}
            </Typography>
        </Box>
    );
};
