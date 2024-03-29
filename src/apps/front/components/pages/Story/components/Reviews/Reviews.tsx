//Librairies
import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
//MUI
import { Box, Button, Container, Divider, Typography, useTheme } from '@mui/material';
//App
import { GlobalRatings, Review, ReviewForm } from './components';
import { useAppSelector } from '~/apps/front/hooks';
import { Path } from '~/packages/types';

export const Reviews = () => {
    // Hooks
    const theme = useTheme();
    const { t: storyT } = useTranslation('story');

    // Store
    const { allReviews } = useAppSelector((state) => state.story);
    const { isAuth } = useAppSelector((state) => state.auth);

    return (
        <Box
            component='section'
            id='reviews'
        >
            <Divider sx={{ flex: 1, mt: 12, mb: 6 }}>
                <Typography
                    component='h1'
                    variant='h1'
                    color={theme.text.title}
                >
                    {storyT('Reviews.title.h1')}
                </Typography>
            </Divider>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: { xxs: 'column', lg: 'row' },
                    justifyContent: 'space-between',
                    gap: 6,
                    p: 0,
                }}
            >
                <Box>
                    <GlobalRatings />
                </Box>
                <Box>
                    {isAuth ? (
                        <ReviewForm />
                    ) : (
                        <Button
                            component={Link}
                            variant='outlined'
                            href={Path.SIGNIN}
                        >
                            {storyT('Reviews.link.no-login')}
                        </Button>
                    )}
                </Box>
            </Container>
            <Divider
                flexItem
                sx={{ width: '50%', m: '0 auto', mt: 6, mb: 6 }}
            />
            <Container>
                {allReviews.length > 0 ? (
                    allReviews.map((review, index) => (
                        <Box key={review.id}>
                            <Review review={review} />
                            {index + 1 < allReviews.length && (
                                <Divider
                                    sx={{
                                        width: '50%',
                                        mx: 'auto',
                                        my: 6,
                                    }}
                                />
                            )}
                        </Box>
                    ))
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography
                        color={theme.text.body} 
                        sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                        >
                            {storyT('Reviews.text.no-review')}
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};
