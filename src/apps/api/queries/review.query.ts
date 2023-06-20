import { StoryReviewInstance } from '~/packages/types';
import { StoryReview } from '../models';
import { CustomError } from '~/packages/classes';
import { GetStoryPreviewsQuery } from '~/packages/types/request/review.types';
import { validQueryData } from '../functions';
import { NextApiRequest } from 'next';
import { getStoryPreviewsSchema } from '~/packages/schemas/review.schemas';
import { ObjectId } from 'mongoose';

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

export const getStoryPreviewsFromDb = async (req: NextApiRequest) => {
    const {storyId, reviewNumber, start } = await validQueryData<GetStoryPreviewsQuery>(
        getStoryPreviewsSchema,
        req
    );
    const storiesReviews: StoryReviewInstance[] = await StoryReview.find({story: storyId})
        .sort({ previewRating: -1 })
        .limit(reviewNumber)
        .skip(start);
    return storiesReviews;
};

export const getThreeBestStoryPreviewsFromDb = async (storyId: ObjectId) => {
    const storiesReviews: StoryReviewInstance[] = await StoryReview.find({story: storyId})
        .sort({ previewRating: -1 })
        .limit(3)
        .skip(0);
    return storiesReviews;
};