import { StoryRatings, StoryReviewData } from '../story';

export type CreateOneReviewBody = {
    storyId: string;
    title?: string;
    text?: string;
    textRating: number;
    imageRating: number;
};

export type CreateOneReviewRes = {
    review: StoryReviewData;
    storyRatings: StoryRatings;
};

export type UpdateOneReviewBody = {
    storyId: string;
    reviewId: string;
    title?: string;
    text?: string;
    textRating: number;
    imageRating: number;
};

export type UpdateOneReviewRes = {
    review: StoryReviewData
    storyRatings: StoryRatings;
};

export type DeleteOnReviewQuery = {
    storyId: string;
    reviewId: string;
};

export type DeleteOneReviewRes = {
    storyRatings: StoryRatings;
};

export type GetStoryPreviewsQuery = {
    storyId: string;
    reviewNumber: number;
    start: number;
};
