// Lbrairies
import { useTranslation } from 'react-i18next';
// MUI
import { Typography, Grid, Box, Divider, useTheme } from '@mui/material';
// Api
import { FinishedStoryCard } from '../FinishedStoryCard/FinishedStoryCard';
// Types
import type { FinishedUserStoryPreview } from '../../../../../../../packages/types';

type FinishedStorySectionProps = {
    finishedUserStoryPreviews: FinishedUserStoryPreview[];
};

export const FinishedStorySection = ({ finishedUserStoryPreviews }: FinishedStorySectionProps) => {
    const { t: userStoriesT } = useTranslation('user-stories');
    const theme = useTheme();

    return (
        <>
            <Divider>
                <Typography
                    color={theme.text.title}
                    component='h2'
                    variant='h2'
                    textAlign='center'
                >
                    {userStoriesT('title.h2.finished-stories')}
                </Typography>
            </Divider>
            <Grid
                container
                rowSpacing={5}
                columnSpacing={{ xxs: 1, sm: 2, md: 3 }}
                sx={{ mt: 1 }}
            >
                {finishedUserStoryPreviews.length > 0 ? (
                    finishedUserStoryPreviews.map((story) => (
                        <Grid
                            key={`${story.id}`}
                            item
                            lg={3}
                            md={4}
                            sm={6}
                            xxs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <FinishedStoryCard story={story} />
                        </Grid>
                    ))
                ) : (
                    <Box
                        sx={{
                            mt: 4,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            textAlign='center'
                            sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
                        >
                            {userStoriesT('FinishedStorySection-no.finished-story')}
                        </Typography>
                    </Box>
                )}
            </Grid>
        </>
    );
};
