export const allStoryThemeErrors = ['is-required'] as const;
export type StoryThemeError = typeof allStoryThemeErrors[number];

export const allStoryImageStyleErrors = ['is-required'] as const;
export type StoryImageStyleError = typeof allStoryImageStyleErrors[number];

export const allStoryDurationErrors = ['is-required'] as const;
export type StoryDurationError = typeof allStoryDurationErrors[number];

export const allStoryLanguageErrors = ['is-required'] as const;
export type StoryLanguageError = typeof allStoryLanguageErrors[number];

export const allSaveStoryErrors = ['is-required'] as const;
export type SaveStoryError = typeof allSaveStoryErrors[number];
