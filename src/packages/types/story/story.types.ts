import { Language } from '../language.types';

/**
 * Story Options
 */
export type StoryOptions = {
    theme: StoryTheme;
    style: StoryImageStyle;
    duration: StoryDuration;
    language: Language;
};

export const allStoryThemes = [
    'travel',
    'funny',
    'love',
    'history',
    'horror',
    'bordedom',
    'dream',
    'fantastic',
    'technology',
    'ecology',
] as const;
export type StoryTheme = typeof allStoryThemes[number];

export const allStoryImageStyles = ['realistic', 'drawing', 'comicStyle', 'digitalArt', 'painting'] as const;
export type StoryImageStyle = typeof allStoryImageStyles[number];

export const allStoryDurations = ['veryShort', 'short', 'medium', 'long', 'veryLong'] as const;
export type StoryDuration = typeof allStoryDurations[number];

/**
 * Chapter
 */
export type StoryChapterChoice = {
    text: string;
    numbOfVotes?: number;
};

export type FirstStoryChapterGenerated = {
    title: string;
    text: string;
    choice1: string;
    choice2: string;
    choice3: string;
    description: string;
};

export type NextStoryChapterGenerated = {
    title: string;
    text: string;
    summary: string;
    choice1: string;
    choice2: string;
    choice3: string;
    description: string;
};

export type LastStoryChapterGenerated = {
    title: string;
    text: string;
    description: string;
};

export type ParsedStoryChapterGenerated = {
    title: string;
    text: string;
    summary?: string;
    allChoices?: StoryChapterChoice[];
    description: string;
};
