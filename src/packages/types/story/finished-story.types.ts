import { Model, ObjectId } from 'mongoose';
import {
    InstanceOfWithDates,
    ImageOnClient,
    ImageOnDb,
    StoryOptions,
    FinishedUserStoryPreview,
    StoryChapterChoice,
    Visibility,
    StoryReviewData,
    StoryRatings,
} from '..';

/**
 * Schema && Instance
 */
export type FinishedStorySchema = {
    type: 'common' | 'user';
    author?: ObjectId;
    title: string;
    visibility: Visibility;
    options: StoryOptions;
    topic: string;
    summary: string;
    cover?: ImageOnDb;
    allChapters: FinishedStoryChapter[];
    ratings: StoryRatings;
    reviews: {
        author: ObjectId;
        review: ObjectId;
    }[];
    numbOfReviews: number;
};

export type FinishedStoryMethods = {
    isAuthor: (userId: string | ObjectId) => boolean;
    getData: () => Promise<FinishedStoryData>;
    getPublicPreview: () => Promise<FinishedPublicStoryPreview>;
    updateStoryRatings: () => Promise<void>;
    getUserPreview: () => Promise<FinishedUserStoryPreview>;
    deleteAllImages: () => Promise<void>;
    hasVoted: (userId: string) => boolean;
};

export interface IFinishedStoryModel extends Model<FinishedStorySchema, {}, FinishedStoryMethods> {}

export type FinishedStoryInstance = InstanceOfWithDates<FinishedStorySchema, FinishedStoryMethods>;

/**
 * Chapter
 */
export type FinishedStoryChapter = {
    title: string;
    text: string;
    allChoices?: StoryChapterChoice[];
    selectedChoiceIndex?: number;
    description: string;
    image?: ImageOnDb;
};

export type FinishedStoryChapterWithImageOnClient = Omit<FinishedStoryChapter, 'image'> & {
    image: ImageOnClient | null;
};

/**
 * Front Data: finshed story
 */
export type FinishedStoryData = {
    id: string;
    title: string;
    author?: {
        id: string;
        username: string;
        avatar?: ImageOnClient;
    };
    topic: string;
    summary: string;
    cover?: ImageOnClient;
    allChapters: FinishedStoryChapterWithImageOnClient[];
    ratings: StoryRatings;
    reviews: {
        author: string;
        review: string;
    }[];
    numbOfReviews: number;
    createdAt: string;
};

/**
 * Front Data: story previews
 */
export type FinishedPublicStoryPreview = {
    id: string;
    type: FinishedStorySchema['type'];
    author?: {
        id: string;
        username: string;
        avatar?: ImageOnClient;
    };
    title: string;
    cover?: ImageOnClient;
    topic: string;
    summary: string;
    options: StoryOptions;
    ratings: StoryRatings;
    reviews: StoryReviewData[];
    numbOfReviews: number;
};

/**
 * Validation
 */
export type FinishedStoryTitle = {
    title: string;
};
