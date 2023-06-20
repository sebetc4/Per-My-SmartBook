// Librairies
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// MUI
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Rating,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
// App
import { CustomAutoResize } from '~/apps/front/components';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { createOneReview, deleteOneReview, updateOneReview } from '~/store';

export const ReviewForm = () => {
    // Hooks
    const { t: storyT } = useTranslation('story');
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // Store
    const { storyData, userReview, isLoading } = useAppSelector((state) => state.story);
    // State
    const [titleReview, setTitleReview] = useState<string>(userReview?.title || '');
    const [textReview, setTextReview] = useState<string>(userReview?.text || '');
    const [textRating, setTextRating] = useState<number>(userReview?.textRating || 2);
    const [imageRating, setImageRating] = useState<number>(userReview?.imageRating || 2);
    const [isBeingModified, setIsBeingModified] = useState<boolean>(false);

    const handleSubmit = () => {
        dispatch(
            createOneReview({
                storyId: storyData!.id,
                title: titleReview,
                text: textReview,
                textRating,
                imageRating,
            })
        );
    };

    const handleUpadte = async () => {
        await dispatch(
            updateOneReview({
                storyId: storyData!.id,
                reviewId: userReview!.id,
                title: titleReview,
                text: textReview,
                textRating,
                imageRating,
            })
        )
        setIsBeingModified(false);
    };

    const handleDelete = async () => {
        await dispatch(deleteOneReview({ storyId: storyData!.id, reviewId: userReview!.id }));
        setTextReview('');
        setTitleReview('');
        setTextRating(2);
        setImageRating(2);
    };

    return (
        <Accordion sx={{width: '100%'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
            >
                <Typography>Ajouter un commentaire</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <TextField
                        label='titre'
                        onChange={(e) => setTitleReview(e.target.value)}
                        value={titleReview}
                        disabled={!!userReview && !isBeingModified}
                        sx={{ width: '350px'}}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating
                                name='text-rating'
                                value={textRating}
                                onChange={(_, newValue) => {
                                    setTextRating(newValue!);
                                }}
                                size='large'
                                precision={0.5}
                                readOnly={!!userReview && !isBeingModified}
                            />
                            <Typography
                                color={theme.text.body}
                                component='legend'
                                sx={{ ml: 1, fontSize: '1.2rem' }}
                            >
                                {storyT('Reviews.label.text')}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating
                                name='image-rating'
                                value={imageRating}
                                onChange={(_, newValue) => {
                                    setImageRating(newValue!);
                                }}
                                size='large'
                                precision={0.5}
                                readOnly={!!userReview && !isBeingModified}
                            />

                            <Typography
                                color={theme.text.body}
                                component='legend'
                                sx={{ ml: 1, fontSize: '1.2rem' }}
                            >
                                {storyT('Reviews.label.image')}
                            </Typography>
                        </Box>
                    </Box>
                    <CustomAutoResize
                        placeholder={storyT('Reviews.customAutoResize.placeholder')}
                        minRows={4}
                        maxRows={8}
                        disabled={!!userReview && !isBeingModified}
                        onChange={(e) => setTextReview(e.target.value)}
                        value={textReview}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {!userReview ? (
                            <LoadingButton
                                variant='outlined'
                                sx={{ fontSize: '1.2rem' }}
                                onClick={handleSubmit}
                                loading={isLoading}
                            >
                                Soumettre
                            </LoadingButton>
                        ) : !isBeingModified ? (
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <Button
                                    variant='outlined'
                                    sx={{ fontSize: '1.2rem' }}
                                    onClick={() => setIsBeingModified(true)}
                                >
                                    Modifier
                                </Button>
                                <LoadingButton
                                    variant='outlined'
                                    color='error'
                                    sx={{ fontSize: '1.2rem' }}
                                    onClick={handleDelete}
                                    loading={isLoading}
                                >
                                    Supprimer
                                </LoadingButton>
                            </Box>
                        ) : (
                            <LoadingButton
                                variant='outlined'
                                sx={{ fontSize: '1.2rem' }}
                                loading={isLoading}
                                onClick={handleUpadte}
                            >
                                Valider
                            </LoadingButton>
                        )}
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};
