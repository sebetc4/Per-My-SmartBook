import * as yup from 'yup';
import {
    CreateOneReviewBody,
    DeleteOnReviewQuery,
    GetStoryPreviewsQuery,
    LikeOrDislikeOneReviewBody,
    UpdateOneReviewBody,
} from '../types/request/review-request.types';
import { idSchema } from './common.schemas';

export const createOneReviewSchema: yup.SchemaOf<CreateOneReviewBody> = yup.object().shape({
    storyId: idSchema,
    title: yup.string(),
    text: yup.string(),
    textReview: yup.string(),
    textRating: yup.number().min(0.5).max(5).required(),
    imageRating: yup.number().min(0.5).max(5).required(),
});

export const getStoryPreviewsSchema: yup.SchemaOf<GetStoryPreviewsQuery> = yup.object().shape({
    start: yup.number().min(0).required(),
    reviewNumber: yup.number().min(1).required(),
    storyId: idSchema,
});

export const updateOneReviewSchema: yup.SchemaOf<UpdateOneReviewBody> = yup.object().shape({
    storyId: idSchema,
    reviewId: idSchema,
    title: yup.string(),
    text: yup.string(),
    textReview: yup.string(),
    textRating: yup.number().min(0.5).max(5).required(),
    imageRating: yup.number().min(0.5).max(5).required(),
});

export const deleteOneReviewSchema: yup.SchemaOf<DeleteOnReviewQuery> = yup.object().shape({
    storyId: idSchema,
    reviewId: idSchema,
});

export const likeOrDislikeOneReviewSchema: yup.SchemaOf<LikeOrDislikeOneReviewBody> = yup.object().shape({
    reviewId: idSchema,
    value: yup.number().min(-1).max(1).required(),
});
