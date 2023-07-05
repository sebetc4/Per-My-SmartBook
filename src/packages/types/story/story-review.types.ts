import { Model, ObjectId } from 'mongoose';
import { InstanceOfWithDates, StoryRatings } from '..';

/**
 * Schema && Instance
 */
export type StoryReviewSchema = {
    author: ObjectId;
    story: ObjectId;
    text?: string;
    title?: string;
    ratings: StoryRatings;
    likes: {
        userId: ObjectId;
        value: number;
    }[];
    reviewRating: number;
};

export type StoryReviewMethods = {
    isAuthor: (userId: string | ObjectId) => boolean;
    getData: () => StoryReviewData;
};

export interface IStoryReviewModel extends Model<StoryReviewSchema, {}, StoryReviewMethods> {}

export type StoryReviewInstance = InstanceOfWithDates<StoryReviewSchema, StoryReviewMethods>;

export type StoryReviewData = {
    id: string;
    title?: string;
    text?: string;
    author: { username: string };
    ratings: StoryRatings;
    likes: {
        userId: string;
        value: number;
    }[];
    reviewRating: number;
    createdAt: string;
    updatedAt: string;
};
