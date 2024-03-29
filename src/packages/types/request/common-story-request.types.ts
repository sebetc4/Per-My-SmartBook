import { ChatMessage, CommonStoryBeingGenerated, CommonStoryChapterClientData, Language } from '..';

/**
 * Get all common stories being generated previex
 */
export type GetAllCommonStoriesBeingGeneratedPreviewsBody = {
    language: Language;
};

export type UpdateCommonStoryStateRes = {
    storyId: string;
    state: CommonStoryBeingGenerated['state'];
}

export type CommonStoryIsDeletedRes = {
    storyId: string;
}

/**
 * Get common story being generated data
 */
export type GetCommonStoriesBeingGeneratedDataBody = {
    storyId: string;
};

/**
 * Select chapter choice
 */
export type SelectCommonStoryStoryChapterChoiceBody = {
    storyId: string;
    selectedChoiceIndex: number;
};

/**
 *  SendChatMessage
 */
export type SendCommonStoryChatMessageBody = {
    storyId: string;
    message: string;
};

/**
 * First chapter
 */
export type FirstCommonStoryChapterRes = {
    chapter: CommonStoryChapterClientData;
};

/**
 *  Chapter data
 */
export type CommonStoryChapterDataRes = {
    chapterIndex: number;
    chapter: Omit<CommonStoryChapterClientData, 'image'>;
    isEnd: boolean;
};

/**
 *  Chapter image
 */
export type CommonStoryChapterImageRes = {
    chapterIndex: number;
    imageUrl: string;
};

/**
 *
 */
export type CommonStoryStoryChapterChoiceAndAllNumbOfVotesRes = {
    selectedChoiceIndex: number;
    allNumbOfVotes: number[];
};

export type NewCommonStoryChatMessageRes = {
    message: ChatMessage
}

export type CommonStoryIsFinishedOrStoppedRes = {
    storyDeletedAt: number;
};
