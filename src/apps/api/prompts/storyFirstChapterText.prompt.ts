import { StoryThemeClass } from '../../../packages/classes';
import { enableLogTextPrompt } from '../../../packages/constants';
import { logIf } from '../../../packages/functions';
import { Language, StoryTheme } from '../../../packages/types';
import { getChapterFormatSentence, getInitialContextSentence } from './common.prompt';

const getIntroductionSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return "génères moi le début d'une histoire à choix multiple ayant comme sujet:";
        case 'en':
            return 'generate the beginning of a multiple choice story with the topic:';
    }
};

const getMiddleSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return "L'histoire est sur";
        case 'en':
            return 'The story is on';
    }
};

type GetStoryFirstChapterTextPromptParams = {
    theme: StoryTheme;
    topic: string;
    language: Language;
};

export const getStoryFirstChapterTextPrompt = ({ theme, topic, language }: GetStoryFirstChapterTextPromptParams) => {
    /* Story options */
    const themeSentence = StoryThemeClass.getSentence(theme, language);

    /* Senetences */
    const inititialContextSentence = getInitialContextSentence(language);
    const introductionSentence = getIntroductionSentence(language);
    const midlleSentence = getMiddleSentence(language);
    const chapterFormatSentence = getChapterFormatSentence(language);

    /* Prompt */
    const textPrompt = `${inititialContextSentence} ${introductionSentence} ${topic}. ${midlleSentence} ${themeSentence}. ${chapterFormatSentence}`;
    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
