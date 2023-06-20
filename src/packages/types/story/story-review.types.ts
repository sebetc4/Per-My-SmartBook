import { Model, ObjectId } from 'mongoose';
import { InstanceOfWithDates } from '..';

/**
 * Schema && Instance
 */
export type StoryReviewSchema = {
    author: ObjectId;
    story: ObjectId;
    text?: string;
    title?: string;
    textRating: number;
    imageRating: number;
    likes: [
        {
            userId: string;
            value: StoryReviewOpinion;
        }
    ];
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
    textRating: number;
    imageRating: number;
    createdAt: string;
    updatedAt: string;
};

export enum StoryReviewOpinion {
    LIKE = 'like',
    DISLIKE = 'dislike',
}
