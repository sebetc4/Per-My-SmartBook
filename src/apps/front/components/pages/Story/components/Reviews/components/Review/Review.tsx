import { Box, Button, Grid, Rating, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreationDate } from '~/apps/front/components/dates/CreationDate/CreationDate';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { StoryReviewData } from '~/packages/types';
import { likeOrDislikeOneReview } from '~/store';

type ReviewProps = {
    review: StoryReviewData;
};

export const Review = ({ review }: ReviewProps) => {
    // Hooks
    const { t: storyT } = useTranslation('story');
    const { locale } = useRouter();
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Store
    const { isAuth } = useAppSelector((state) => state.auth);
    const { session: userData } = useAppSelector((state) => state.user);
    const { isLoading } = useAppSelector((state) => state.story);

    const [userVote, setUserVote] = useState<number>(0);

    useEffect(() => {
        setUserVote(review.likes.find((like) => like.userId === userData?.id)?.value ?? 0);
    }, [review.likes, userData]);

    const handleLikeOrDislike = (value: number) => {
        dispatch(likeOrDislikeOneReview({ reviewId: review.id, value: value === userVote ? 0 : value }));
    };

    return (
        <Grid
            container
            component='article'
            spacing={6}
            alignItems='center'
        >
            <Grid
                item
                xxs={1}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <Button
                    onClick={() => handleLikeOrDislike(1)}
                    disabled={isLoading || !isAuth}
                >
                    <Box
                        sx={{
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderBottom: `20px solid ${userVote === 1 ? 'green' : theme.palette.grey[800]}`,
                        }}
                    />
                </Button>
                <Typography
                    color={review.reviewRating === 0 ? theme.text.body : review.reviewRating > 0 ? 'green' : 'red'}
                >
                    {review.reviewRating}
                </Typography>
                <Button
                    onClick={() => handleLikeOrDislike(-1)}
                    disabled={isLoading || !isAuth}
                >
                    <Box
                        sx={{
                            width: 0,
                            height: 0,
                            borderLeft: '10px solid transparent',
                            borderRight: '10px solid transparent',
                            borderTop: `20px solid ${userVote === -1 ? 'red' : theme.palette.grey[800]}`,
                        }}
                    />
                </Button>
            </Grid>

            <Grid
                item
                xxs={2}
            >
                <Typography
                    sx={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        fontStyle: 'italic',
                    }}
                    color={theme.text.body}
                >{`${storyT('Review.text.by')} ${review.author.username}`}</Typography>
                <CreationDate
                    locale={locale!}
                    date={review.createdAt}
                    sx={{
                        mt: 1,
                        fontStyle: 'italic',
                        color: theme.text.body,
                    }}
                />
            </Grid>

            <Grid
                item
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
                xxs={3}
            >
                <Grid
                    container
                    alignItems='center'
                    sx={{ minWidth: '250px' }}
                >
                    <Grid
                        item
                        xxs={6}
                    >
                        <Typography
                            sx={{
                                flex: 1,
                                fontWeight: 700,
                            }}
                            color={theme.text.body}
                        >{`${storyT('Review.text.global-rating')}`}</Typography>
                    </Grid>
                    <Grid
                        item
                        xxs={6}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                        <Rating
                            name={storyT('Review.text.global-rating')}
                            value={review.ratings.globalRating}
                            readOnly
                            precision={0.5}
                        />
                        <Typography color={theme.text.body}>{review.ratings.globalRating}</Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems='center'
                    sx={{ minWidth: '250px' }}
                >
                    <Grid
                        item
                        xxs={6}
                    >
                        <Typography
                            sx={{
                                flex: 1,
                                fontWeight: 700,
                            }}
                            color={theme.text.body}
                        >{`${storyT('Review.text.text-rating')}`}</Typography>
                    </Grid>
                    <Grid
                        item
                        xxs={6}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                        <Rating
                            name={storyT('Review.text.text-rating')}
                            value={review.ratings.textRating}
                            readOnly
                            precision={0.5}
                        />
                        <Typography color={theme.text.body}>{review.ratings.textRating}</Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems='center'
                    sx={{ minWidth: '250px' }}
                >
                    <Grid
                        item
                        xxs={6}
                    >
                        <Typography
                            sx={{
                                flex: 1,
                                fontWeight: 700,
                            }}
                            color={theme.text.body}
                        >{`${storyT('Review.text.image-rating')}`}</Typography>
                    </Grid>
                    <Grid
                        item
                        xxs={6}
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                        <Rating
                            name={storyT('Review.text.image-rating')}
                            value={review.ratings.imageRating}
                            readOnly
                            precision={0.5}
                        />
                        <Typography color={theme.text.body}>{review.ratings.imageRating}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                xxs={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <Typography
                    component='h4'
                    variant='h4'
                    color={theme.text.subtitle}
                >
                    {review.title}
                </Typography>
                <Typography color={theme.text.body}>{review.text}</Typography>
            </Grid>
        </Grid>
    );
};
