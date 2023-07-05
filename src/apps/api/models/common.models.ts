import { allVisibilityValues } from '../../../packages/types';

export const imageSchema = {
    key: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: allVisibilityValues,
        required: true,
    },
    plaiceholder: {
        type: String,
        required: true,
    },
};

export const reviewRatingsSchema = {
    globalRating: {
        type: Number,
        default: 0,
        min: 0.5,
        max: 5,
    },
    textRating: {
        type: Number,
        default: 0,
        min: 0.5,
        max: 5,
    },
    imageRating: {
        type: Number,
        default: 0,
        min: 0.5,
        max: 5,
    },
};
