import { forwardRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { TransitionProps } from '@mui/material/transitions';
import { Box, Button, Dialog, Divider, Grid, Rating, Slide, Typography } from '@mui/material';
import { IoClose } from 'react-icons/io5';

import { placeholderValue } from '../../../../../utils';
import { CustomAvatar } from '../../../../CustomAvatar/CustomAvatar';
import { FinishedPublicStoryPreview } from '../../../../../../../packages/types';

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

    const rating = (story.ratings.imageRating + story.ratings.textRating) / 2;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}
            transitionDuration={600}
            PaperProps={{ sx: { position: 'fixed', width: { xxs: '100%', md: '50%' }, right: 0 } }}
        >
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
                        xxs={6}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                aspectRatio: '1 / 1',
                                width: '100%',
                                maxWidth: '512px',
                                borderRadius: 8,
                            }}
                        >
                            <Image
                                src={story.cover?.url || bookImage!}
                                placeholder={placeholderValue(!!story.cover)}
                                blurDataURL={story.cover?.plaiceholder}
                                alt={"Illustration de l'histoire"}
                                quality={100}
                                style={{ borderRadius: 8 }}
                                fill
                            />
                        </Box>
                        <Button
                            sx={{ position: 'absolute', top: '-20px', left: 0 }}
                            onClick={handleClose}
                        >
                            <IoClose size={40} />
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xxs={6}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}
                    >
                        <Typography
                            fontWeight={700}
                            variant='h3'
                            component={'h2'}
                        >
                            {story.title}
                        </Typography>
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
                                value={rating}
                                readOnly
                            />
                            <Typography>{rating}</Typography>
                            <Typography>{`(${story.numbOfReviews} ${publicStoriesT(
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
                    sx={{ mb: 2 }}
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
                {story.reviews.map((review, index) => (
                    <>
                        <Box
                            component='article'
                            key={`review-${index}`}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1.2rem',
                                        fontWeight: 700,
                                    }}
                                >{`${publicStoriesT('StoryDetails.text.review.by')}`}</Typography>
                                <Typography
                                    sx={{
                                        fontSize: '1.2rem',
                                        fontWeight: 700,
                                    }}
                                >
                                    {review.author.username}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 4,
                                    mt: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >{`${publicStoriesT('StoryDetails.text.review.text-rating')}:`}</Typography>
                                        <Rating
                                            name={publicStoriesT('StoryDetails.text.review.text-rating')}
                                            value={review.textRating}
                                            readOnly
                                        />
                                        <Typography>{review.textRating}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >{`${publicStoriesT('StoryDetails.text.review.image-rating')}:`}</Typography>
                                        <Rating
                                            name={publicStoriesT('StoryDetails.text.review.image-rating')}
                                            value={review.imageRating}
                                            readOnly
                                        />
                                        <Typography>{review.imageRating}</Typography>
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
                                    >
                                        {review.title}
                                    </Typography>
                                    <Typography>{review.text}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        {index !== story.reviews.length - 1 && (
                            <Divider
                                sx={{
                                    m: '0 auto',
                                    mt: 4,
                                    mb: 4,
                                    maxWidth: '50%',
                                }}
                            />
                        )}
                    </>
                ))}
            </Box>
        </Dialog>
    );
};
