import {
    ChatMessage,
    ImageOnClient,
    ImageOnDb,
    StoryBeingGeneratedChapterImageOnClient,
    StoryChapterChoice,
    StoryOptions,
    StoryTheme,
} from '..';

/**
 * Schema
 */
export type CommonStoryBeingGenerated = {
    id: string;
    state: 'waiting' | 'generating' | 'stopped' | 'finished';
    options: StoryOptions;
    currentStep: number;
    cover?: ImageOnDb;
    topic: string;
    votesAreOpen: boolean;
    allChapters: CommonStoryChapter[];
    startAt: number;
    allChatMessages: ChatMessage[];
};

/**
 * Topic
 */
export type CommonStoryTopic = {
    text: string;
    description: string;
};

export type CommonStoryTopicGenerated = {
    englishTopic: string;
    translatedTopic: string;
};

export type CommonStoryTopicGeneratedEn = {
    topic: string;
};

/**
 * Chapter
 */
export type CommonStoryChapter = {
    title: string;
    text: string;
    summary?: string;
    allChoices?: StoryChapterChoice[];
    voters?: string[];
    selectedChoiceIndex?: number;
    description: string;
    image?: ImageOnDb;
    endAt?: number;
};

export type CommonStoryChapterClientData = Omit<CommonStoryChapter, 'image' | 'voters'> & {
    image?: StoryBeingGeneratedChapterImageOnClient;
};

/**
 * Generated data
 */
export type CommonStorySummaryAndTitleGenerated = {
    summary: string;
    title: string;
};

/**
 * Front Data: Story being generated
 */
export type CommonStoryBeingGeneratedData = {
    id: string;
    state: 'waiting' | 'generating' | 'stopped' | 'finished';
    currentStep: number;
    cover?: ImageOnClient;
    topic: string;
    allChapters: CommonStoryChapterClientData[];
    startAt: number;
};

export type CommonStoryBeingGeneratedDataWithChatMessages = {
    storyData: CommonStoryBeingGeneratedData;
    allChatMessages: ChatMessage[];
}

/**
 * Front Data: Story preview
 */
export type CommonStoryBeingGeneratedPreview = {
    id: string;
    state: CommonStoryBeingGenerated['state'];
    topic: string;
    theme: StoryTheme;
    cover?: ImageOnClient;
    startAt: number;
};

/**
 * Story Genreration
 */
export type CurrentStoryStatus = {
    nextChapterStartAt: number | null;
    state: CommonStoryBeingGenerated['state'];
};
