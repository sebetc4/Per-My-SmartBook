import { Model, ObjectId } from 'mongoose';
import { Visibility } from '../common.types';
import { ImageOnClient, ImageOnDb, StoryBeingGeneratedChapterImageOnClient } from '../image.types';
import { InstanceOfWithDates } from '../utils.types';
import { StoryChapterChoice, StoryOptions } from './story.types';

/**
 * Schema && Instance
 */
export type UnfinishedUserStorySchema = {
    author: ObjectId;
    state: 'selectOptions' | 'selectTopic' | 'generating' | 'finished';
    options: StoryOptions;
    currentStep: number;
    allTopics?: UserStoryTopic[];
    topic: string;
    cover?: ImageOnDb;
    allChapters: UserStoryChapter[];
};

export type UnfinishedUserStoryMethods = {
    isAuthor: (userId: string | ObjectId) => boolean;
    getData: () => Promise<UserStoryBeingGeneratedData>;
    getPreview: () => Promise<UnfinishedUserStoryPreview>;
    deleteAllImages: () => Promise<void>;
};

export interface IUnfinishedUserStoryModel extends Model<UnfinishedUserStorySchema, {}, UnfinishedUserStoryMethods> {}

export type UnfinishedUserStoryInstance = InstanceOfWithDates<UnfinishedUserStorySchema, UnfinishedUserStoryMethods>;

/**
 * Topics
 */
export type UserStoryTopic = {
    text: string;
    description: string;
    imageUrl?: string;
};

export type UserStoryTopicsGenerated = {
    englishTopics: [string, string, string, string];
    translatedTopics: [string, string, string, string];
};

export type UserStoryTopicsGeneratedEn = {
    allTopics: [string, string, string, string];
};

/**
 * Chapter
 */
export type UserStoryChapter = {
    title: string;
    text: string;
    summary?: string;
    allChoices?: StoryChapterChoice[];
    selectedChoiceIndex?: number;
    description: string;
    image?: ImageOnDb;
};

export type UserStoryChapterWithImageOnClient =
    | Omit<UserStoryChapter, 'image'> & { image?: StoryBeingGeneratedChapterImageOnClient };

/**
 * Summary
 */
export type UserStorySummaryGenerated = {
    summary: string;
};

/**
 * Front Data: Story being generated
 */
export type UserStoryBeingGeneratedData = {
    id: string | null;
    state: UnfinishedUserStorySchema['state'];
    currentStep: UnfinishedUserStorySchema['currentStep'];
    allTopics: UnfinishedUserStorySchema['allTopics'];
    allChapters: UserStoryChapterWithImageOnClient[];
};

/**
 * Front Data: Stories previews
 */
export type UnfinishedUserStoryPreview = {
    id: string;
    cover?: ImageOnClient;
    topic: string;
};

export type FinishedUserStoryPreview = {
    id: string;
    title: string;
    cover?: ImageOnClient;
    topic: string;
    summary: string;
    options: StoryOptions;
    visibility: Visibility;
    rating: number;
};
