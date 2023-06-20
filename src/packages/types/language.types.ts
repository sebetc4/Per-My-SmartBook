/**
 * Language
 */
export type Sentence = {
    fr: string;
    en: string;
};

export const allLanguages = ['fr', 'en'] as const;
export type Language = typeof allLanguages[number];
