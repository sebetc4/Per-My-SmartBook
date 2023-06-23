import { Box, Button, Divider, Rating, Typography, useTheme } from '@mui/material';
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
    }, [review.likes]);

    const globalRating = (review.textRating + review.imageRating) / 2;

    const handleLikeOrDislike = (value: number) => {
        dispatch(likeOrDislikeOneReview({ reviewId: review.id, value: value === userVote ? 0 : value }));
    };

    return (
        <Box
            component='article'
            sx={{ display: 'flex', gap: 4 }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                    onClick={() => handleLikeOrDislike(1)}
                    disabled={isLoading || !isAuth}
                >
                    <Box
                        sx={{
                            width: 0,
                            height: 0,
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderBottom: `30px solid ${userVote === 1 ? 'green' : theme.palette.grey[800]}`,
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
                            borderLeft: '15px solid transparent',
                            borderRight: '15px solid transparent',
                            borderTop: `30px solid ${userVote === -1 ? 'red' : theme.palette.grey[800]}`,
                        }}
                    />
                </Button>
            </Box>
            <Divider
                orientation='vertical'
                flexItem
            />
            <Box>
                <Typography
                    sx={{
                        fontSize: '1.2rem',
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
            </Box>
            <Divider
                orientation='vertical'
                flexItem
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Box sx={{ minWidth: '250px', display: 'flex', gap: 2 }}>
                    <Typography
                        sx={{
                            flex: 1,
                            fontWeight: 700,
                        }}
                        color={theme.text.body}
                    >{`${storyT('Review.text.global-rating')}`}</Typography>
                    <Rating
                        name={storyT('Review.text.global-rating')}
                        value={globalRating}
                        readOnly
                    />
                    <Typography color={theme.text.body}>{globalRating}</Typography>
                </Box>
                <Box sx={{ minWidth: '250px', display: 'flex', gap: 2 }}>
                    <Typography
                        sx={{
                            flex: 1,
                            fontWeight: 700,
                        }}
                        color={theme.text.body}
                    >{`${storyT('Review.text.text-rating')}`}</Typography>
                    <Rating
                        name={storyT('Review.text.text-rating')}
                        value={review.textRating}
                        readOnly
                    />
                    <Typography color={theme.text.body}>{review.textRating}</Typography>
                </Box>
                <Box
                    sx={{ minWidth: '250px', display: 'flex', gap: 2 }}
                    color={theme.text.body}
                >
                    <Typography
                        sx={{
                            flex: 1,
                            fontWeight: 700,
                        }}
                        color={theme.text.body}
                    >{`${storyT('Review.text.image-rating')}`}</Typography>
                    <Rating
                        name={storyT('Review.text.image-rating')}
                        value={review.imageRating}
                        readOnly
                    />
                    <Typography color={theme.text.body}>{review.imageRating}</Typography>
                </Box>
            </Box>
            <Divider
                orientation='vertical'
                flexItem
            />
            <Box
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
            </Box>
        </Box>
    );
};
