// Librairies
import { Box, Grid, Rating, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
// App
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
                width: { xxs: '250 px', xs: '350px' },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Grid
                container
                alignItems='center'
            >
                <Grid
                    item
                    xxs={6}
                >
                    <Typography
                        color={theme.text.body}
                        sx={{
                            flex: 1,
                            fontSize: '1.2rem',
                        }}
                    >
                        {`${storyT('GlobalRatings.text.global-rating')}`}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xxs={6}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                    <Rating
                        name={storyT('GlobalRatings.text.global-rating')}
                        value={storyData?.ratings.globalRating}
                        readOnly
                        precision={0.5}
                    />
                    <Typography color={theme.text.body}>{storyData?.ratings.globalRating}</Typography>
                </Grid>
            </Grid>
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
            <Grid
                container
                alignItems='center'
            >
                <Grid
                    item
                    xxs={6}
                >
                    <Typography
                        sx={{ flex: 1 }}
                        color={theme.text.body}
                    >{`${storyT('GlobalRatings.text.text-rating')}`}</Typography>
                </Grid>
                <Grid
                    item
                    xxs={6}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                    <Rating
                        name={storyT('GlobalRatings.text.text-rating')}
                        value={storyData?.ratings.textRating}
                        readOnly
                        precision={0.5}
                    />
                    <Typography color={theme.text.body}>{storyData?.ratings.textRating}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                alignItems='center'
            >
                <Grid
                    item
                    xxs={6}
                >
                    <Typography
                        sx={{ flex: 1 }}
                        color={theme.text.body}
                    >{`${storyT('GlobalRatings.text.image-rating')}`}</Typography>
                </Grid>
                <Grid
                    item
                    xxs={6}
                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                >
                    <Rating
                        name={storyT('GlobalRatings.text.image-rating')}
                        value={storyData?.ratings.imageRating}
                        readOnly
                        precision={0.5}
                    />
                    <Typography color={theme.text.body}>{storyData?.ratings.imageRating}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
