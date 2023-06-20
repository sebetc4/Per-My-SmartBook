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

export const getStoryPreviewsFromDb = async (req: NextApiRequest) => {
    const { storyId, reviewNumber, start } = await validQueryData<GetStoryPreviewsQuery>(getStoryPreviewsSchema, req);
    const storiesReviews: StoryReviewInstance[] = await StoryReview.find({ story: storyId })
        .sort({ previewRating: -1 })
        .limit(reviewNumber)
        .skip(start);
    return storiesReviews;
};

export const getThreeBestStoryPreviewsFromDb = async (storyId: ObjectId) => {
    const storiesReviews: StoryReviewInstance[] = await StoryReview.find({ story: storyId })
        .sort({ previewRating: -1 })
        .limit(3)
        .skip(0)
        .populate({
            path: 'author',
            select: 'username',
        });
    return storiesReviews;
};
