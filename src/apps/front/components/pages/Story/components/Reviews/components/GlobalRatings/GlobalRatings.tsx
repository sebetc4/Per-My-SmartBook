import { Box, Rating, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '~/apps/front/hooks';

export const GlobalRatings = () => {
    // Hooks
    const { t: storyT } = useTranslation('story');
    const theme = useTheme();

    // Store
    const { storyData } = useAppSelector((state) => state.story);

    return (
        <Box
            sx={{
                width: '350px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                    color={theme.text.body}
                    sx={{
                        flex: 1,
                        fontSize: '1.2rem',
                    }}
                >
                    {`${storyT('GlobalRatings.text.global-rating')}`}
                </Typography>
                <Rating
                    name={storyT('GlobalRatings.text.global-rating')}
                    value={storyData?.ratings.globalRating}
                    readOnly
                />
                <Typography color={theme.text.body}>{storyData?.ratings.globalRating}</Typography>
            </Box>
            <Typography
                color={theme.text.body}
                sx={{ fontStyle: 'italic' }}
            >
                {`${storyData?.numbOfReviews} ${
                    storyData!.numbOfReviews <= 1
                        ? storyT('GlobalRatings.text.numb-of-review')
                        : storyT('GlobalRatings.text.numb-of-reviews')
                }`}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                    sx={{ flex: 1 }}
                    color={theme.text.body}
                >{`${storyT('GlobalRatings.text.text-rating')}`}</Typography>
                <Rating
                    name={storyT('GlobalRatings.text.text-rating')}
                    value={storyData?.ratings.textRating}
                    readOnly
                />
                <Typography color={theme.text.body}>{storyData?.ratings.textRating}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography
                    sx={{ flex: 1 }}
                    color={theme.text.body}
                >{`${storyT('GlobalRatings.text.image-rating')}`}</Typography>
                <Rating
                    name={storyT('GlobalRatings.text.image-rating')}
                    value={storyData?.ratings.imageRating}
                    readOnly
                />
                <Typography color={theme.text.body}>{storyData?.ratings.imageRating}</Typography>
            </Box>
        </Box>
    );
};
