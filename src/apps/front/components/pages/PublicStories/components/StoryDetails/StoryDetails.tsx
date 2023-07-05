// Librairies
import { forwardRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
// MUI
import { TransitionProps } from '@mui/material/transitions';
import { Box, Dialog, Divider, Grid, IconButton, Rating, Slide, Typography } from '@mui/material';
import { IoClose } from 'react-icons/io5';
// App
import { placeholderValue } from '../../../../../utils';
import { FinishedPublicStoryPreview, ImageOnClient, StoryReviewData } from '~/packages/types';
import { CreationDate, CustomAvatar } from '~/apps/front/components';
import { useAppMediaQuery } from '~/apps/front/hooks';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return (
        <Slide
            direction='left'
            ref={ref}
            {...props}
        />
    );
});

type StoryDetailsProps = {
    story: FinishedPublicStoryPreview;
    open: boolean;
    bookImage?: StaticImageData;
    handleClose: () => void;
};

export const StoryDetails = ({ story, open, handleClose, bookImage }: StoryDetailsProps) => {
    // Hooks
    const { t: storyInputsT } = useTranslation('story-inputs');
    const { t: publicStoriesT } = useTranslation('public-stories');
    const { mediaQuery } = useAppMediaQuery();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}
            transitionDuration={600}
            scroll='paper'
            PaperProps={{
                sx: { position: 'fixed', width: { xxs: '100%', md: '75%', lg: '60%', xl: '50%' }, right: 0 },
            }}
            sx={{ zIndex: 1700 }}
        >
            <IconButton
                aria-label='close'
                sx={{ position: 'absolute', top: '10px', left: '10px' }}
                onClick={handleClose}
            >
                <IoClose size={40} />
            </IconButton>
            <Box sx={{ p: 6 }}>
                <Grid
                    container
                    columnSpacing={4}
                >
                    <Grid
                        item
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 4,
                        }}
                        xxs={0}
                        md={6}
                    >
                        <CoverImage
                            bookImage={bookImage!}
                            cover={story.cover}
                        />
                    </Grid>
                    <Grid
                        item
                        xxs={12}
                        md={6}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}
                    >
                        <Typography
                            fontWeight={700}
                            variant='h3'
                            component={'h2'}
                            textAlign='center'
                            sx={{ mx: 'auto' }}
                        >
                            {story.title}
                        </Typography>
                        {!mediaQuery.upMd && (
                            <CoverImage
                                bookImage={bookImage!}
                                cover={story.cover}
                            />
                        )}
                        {story.type === 'user' ? (
                            <Link
                                href={'/'}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    fontSize: '1.2rem',
                                }}
                            >
                                <CustomAvatar
                                    username={story.author!.username}
                                    avatarUrl={story.author!.avatar?.url || null}
                                    size={40}
                                />
                                {story.author!.username}
                            </Link>
                        ) : (
                            <Typography>{publicStoriesT('StoryDetails.text.commun-story')}</Typography>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontSize: '1.2rem' }}>
                                {`${publicStoriesT('StoryDetails.text.rating')}:`}
                            </Typography>
                            <Rating
                                name={"note de l'histoire"}
                                value={story.ratings.globalRating}
                                readOnly
                                precision={0.5}
                            />
                            <Typography>{story.ratings.globalRating}</Typography>
                            <Typography sx={{ fontStyle: 'italic' }}>{`(${story.numbOfReviews} ${publicStoriesT(
                                'StoryDetails.text.numb-of-reviews'
                            )})`}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography>{`${publicStoriesT('StoryCard.option-item.theme')}: ${storyInputsT(
                                `theme.item.${story.options.theme}`
                            )}`}</Typography>
                            <Typography>{`${publicStoriesT('StoryCard.option-item.duration')}: ${storyInputsT(
                                `duration.item.${story.options.duration}`
                            )}`}</Typography>
                            <Typography>{`${publicStoriesT('StoryCard.option-item.language')}: ${storyInputsT(
                                `language.item.${story.options.language}`
                            )}`}</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Divider
                    textAlign='left'
                    sx={{ mt: { xxs: 4, md: 2 }, mb: 2 }}
                >
                    <Typography
                        component={'h3'}
                        variant='h3'
                    >
                        {publicStoriesT('StoryDetails.title.h3.summary')}
                    </Typography>
                </Divider>
                <Typography textAlign='justify'>{story.summary}</Typography>
                <Divider
                    textAlign='left'
                    sx={{ mt: 6, mb: 2 }}
                >
                    <Typography
                        component='h3'
                        variant='h3'
                    >
                        {publicStoriesT('StoryDetails.title.h3.review')}
                    </Typography>
                </Divider>
                {story.reviews.length > 0 ? (
                    story.reviews.map((review, index) => (
                        <Box key={`review-${index}`}>
                            <Review review={review} />
                            {index !== story.reviews.length - 1 && (
                                <Divider
                                    sx={{
                                        mx: 'auto',
                                        my: 4,
                                        maxWidth: '50%',
                                    }}
                                />
                            )}
                        </Box>
                    ))
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                            {publicStoriesT('StoryDetails.text.no-review')}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
};

type CoverImageProps = {
    cover?: ImageOnClient;
    bookImage: StaticImageData;
};
const CoverImage = ({ cover, bookImage }: CoverImageProps) => {
    return (
        <Box
            sx={{
                position: 'relative',
                aspectRatio: '1 / 1',
                width: '100%',
                maxWidth: '512px',
                borderRadius: 8,
                mx: 'auto',
            }}
        >
            <Image
                src={cover?.url || bookImage!}
                placeholder={placeholderValue(!!cover)}
                blurDataURL={cover?.plaiceholder}
                alt={"Illustration de l'histoire"}
                quality={100}
                style={{ borderRadius: 8 }}
                fill
            />
        </Box>
    );
};

type ReviewProps = {
    review: StoryReviewData;
};

const Review = ({ review }: ReviewProps) => {
    // Hooks
    const { t: publicStoriesT } = useTranslation('public-stories');
    const { locale } = useRouter();

    return (
        <Box component='article'>
            <Typography
                sx={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    fontStyle: 'italic',
                }}
            >{`${publicStoriesT('StoryDetails.text.review.by')} ${review.author.username}`}</Typography>
            <CreationDate
                locale={locale!}
                date={review.createdAt}
                sx={{
                    mt: 1,
                    fontStyle: 'italic',
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    gap: 4,
                    mt: 2,
                }}
            >
                <Box
                    sx={{
                        width: '250px',
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
                            xxs={4}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                }}
                            >{`${publicStoriesT('StoryDetails.text.review.global-rating')}`}</Typography>
                        </Grid>
                        <Grid
                            item
                            xxs={8}
                            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        >
                            <Rating
                                name={publicStoriesT('StoryDetails.text.review.global-rating')}
                                value={review.ratings.globalRating}
                                readOnly
                                precision={0.5}
                            />
                            <Typography>{review.ratings.globalRating}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        alignItems='center'
                    >
                        <Grid
                            item
                            xxs={4}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                }}
                            >{`${publicStoriesT('StoryDetails.text.review.text-rating')}`}</Typography>
                        </Grid>
                        <Grid
                            item
                            xxs={8}
                            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        >
                            <Rating
                                name={publicStoriesT('StoryDetails.text.review.text-rating')}
                                value={review.ratings.textRating}
                                readOnly
                                precision={0.5}
                            />
                            <Typography>{review.ratings.textRating}</Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        alignItems='center'
                    >
                        <Grid
                            item
                            xxs={4}
                        >
                            {' '}
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                }}
                            >{`${publicStoriesT('StoryDetails.text.review.image-rating')}`}</Typography>
                        </Grid>
                        <Grid
                            item
                            xxs={8}
                            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                        >
                            <Rating
                                name={publicStoriesT('StoryDetails.text.review.image-rating')}
                                value={review.ratings.imageRating}
                                readOnly
                                precision={0.5}
                            />
                            <Typography>{review.ratings.imageRating}</Typography>
                        </Grid>
                    </Grid>
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
                    >
                        {review.title}
                    </Typography>
                    <Typography>{review.text}</Typography>
                </Box>
            </Box>
        </Box>
    );
};
