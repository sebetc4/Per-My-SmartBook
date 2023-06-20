import { Language } from "..";
import { FinishedPublicStoryPreview, StoryDuration, StoryTheme } from "../story";

/**
 * Search publics stories
 */
export type PublicStoriesSearchQuery = {
    search?: string;
    theme: StoryTheme | 'all';
    duration: StoryDuration | 'all';
    language: Language | 'all'
    page: number;
}

export type PublicStoriesSearchRes = {
    stories: FinishedPublicStoryPreview[];
    total: number;
}