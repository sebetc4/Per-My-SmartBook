import { NextApiRequest } from 'next';
import { ObjectId } from 'mongoose';
import { StoryReviewInstance, GetStoryPreviewsQuery } from '~/packages/types';
import { CustomError } from '~/packages/classes';
import { getStoryPreviewsSchema } from '~/packages/schemas';
import { StoryReview } from '../models';
import { validQueryData } from '../functions';

export const getAllStoryReviewRatingsFromDb = async (storyId: string) => {
    const reviews: StoryReviewInstance[] = await StoryReview.find({ story: storyId }, ['textRating', 'imageRating']);
    return reviews;
};

export const getOneStoryReviewById = async (reviewId: string) => {
    const review: StoryReviewInstance | null = await StoryReview.findById(reviewId);
    if (!review) {
        throw CustomError.BAD_REQUEST;
    }
    return review;
};

export const getStoryReviewsFromDb = async (storyId: ObjectId | string, reviewNumber: number, start: number) => {
    const storiesReviews: StoryReviewInstance[] = await StoryReview.find({ story: storyId })
        .sort({ previewRating: -1 })
        .limit(reviewNumber)
        .skip(start)
        .populate({
            path: 'author',
            select: 'username',
        });
    return storiesReviews;
};

