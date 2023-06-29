import { StoryDuration } from "../types";

export const enableCommonStoryDevMode = process.env.NODE_ENV === 'development'
export const minutesBeforeCommonStoryStart = enableCommonStoryDevMode ? 1 : 60;
export const minutesAfterCommonStoryEnd = enableCommonStoryDevMode ? 5 : 30;
export const commonStoryChapterDurationSeconds = enableCommonStoryDevMode ? 30 : 60;
export const commonStoryDuration: StoryDuration = enableCommonStoryDevMode ? 'veryShort' : 'medium';
export const veryShortStoryDuration = enableCommonStoryDevMode ? 2 : 5;
export const stopCommonStoryIfNoVoters = true
export const imageGenerationIsEnable = false;


