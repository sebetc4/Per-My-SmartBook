import { Language } from '..';
import {
    FinishedUserStoryPreview,
    StoryDuration,
    StoryImageStyle,
    StoryTheme,
    UnfinishedUserStoryPreview,
    UserStoryBeingGeneratedData,
    UserStoryChapterWithImageOnClient,
    UserStoryTopic,
} from '../story';
import { ResWithSession } from '.';

/**
 * Get user stories previews
 */
export type UserStoriesPreviews = {
    unfinishedStoriesPreviews: UnfinishedUserStoryPreview[];
    finishedUserStoryPreviews: FinishedUserStoryPreview[];
};

export type GetUserStoriesServerSideRes = ResWithSession<UserStoriesPreviews>;

/**
 * Resume Story
 */
export type ResumeUserStoryBody = {
    storyId: string;
};

export type UserStoryDataRes = {
    story: UserStoryBeingGeneratedData;
};

/**
 * Select Options
 */
export type SelectUserStoryOptionsBody = {
    theme: StoryTheme;
    style: StoryImageStyle;
    duration: StoryDuration;
    language: Language;
};

export type UserStoryTopicsDataRes = {
    storyId: string;
    allTopics: UserStoryTopic[];
};

export type UserStoryTopicsImagesRes = {
    allImagesUrl: string[];
};

/**
 * Select topic
 */
export type SelectUserStoryTopicBody = {
    storyId: string;
    selectedTopicIndex: number;
};

/**
 * Select chapter choice
 */
export type SelectUserStoryStoryChapterChoiceBody = {
    storyId: string;
    selectedChoiceIndex: number;
};

export type UserStoryStoryChapterChoiceIsSelectedRes = {
    selectedChoiceIndex: number;
};

export type UserStoryChapterDataRes = {
    chapterIndex: number;
    chapter: UserStoryChapterWithImageOnClient;
    isEnd: boolean;
};

export type UserStoryChapterImageRes = {
    chapterIndex: number;
    imageUrl: string;
};

/**
 * Save story
 */
export type SaveFinishedUserStoryBody = {
    storyId: string;
    visibility: 'private' | 'public';
    title: string;
};

export type UserStoryIsSavedRes = {
    title: string;
};

/**
 * Delete story
 */
export type SaveFinishedUserStoryRes = {
    storyId: string;
};

export type DeleteUnfinishedUserStoryBody = {
    storyId: string;
};
