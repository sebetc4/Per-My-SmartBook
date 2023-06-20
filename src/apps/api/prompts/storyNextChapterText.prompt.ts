import { StoryDurationClass, StoryThemeClass } from '../../../packages/classes';
import { enableLogTextPrompt } from '../../../packages/constants';
import { logIf } from '../../../packages/functions';
import { Language, StoryDuration, StoryTheme } from '../../../packages/types';
import {
    getChapterFormatSentence,
    getChoiceChapterSentence,
    getInitialContextSentence,
    getSumaryStorySentence,
} from './common.prompt';

const getIntroductionSentence = (
    language: Language,
    currentStep: number,
    duration: number,
    themeSentence: string
): string => {
    switch (language) {
        case 'fr':
            return `nous sommes au ${currentStep}ème chapitre sur ${duration} d'une histoire détaillée à choix multiple sur ${themeSentence} et tu dois me générer la suite.`;
        case 'en':
            return 'generate the beginning of a multiple choice story with the topic:';
    }
};

const getContinueStorySentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return "Généres moi la suite de l'histoire.";
        case 'en':
            return 'Tell me the rest of the story.';
    }
};

type getStoryNextChapterTextPromptProps = {
    theme: StoryTheme;
    duration: StoryDuration;
    currentStep: number;
    storySummary: string;
    choice: string;
    language: Language;
};

export const getStoryNextChapterTextPrompt = ({
    theme,
    duration,
    currentStep,
    storySummary,
    choice,
    language,
}: getStoryNextChapterTextPromptProps) => {
    /* Story options */
    const themeSentence = StoryThemeClass.getSentence(theme, language);
    const storyDuration = StoryDurationClass.getDuration(duration);

    /* Senetences */
    const inititialContextSentence = getInitialContextSentence(language);
    const introductionSentence = getIntroductionSentence(language, currentStep + 1, storyDuration!, themeSentence!);
    const summaryStorySentence = getSumaryStorySentence(language, storySummary);
    const choiceChapterSentence = getChoiceChapterSentence(language, choice);
    const continueStorySentence = getContinueStorySentence(language);
    const chapterFormatSentence = getChapterFormatSentence(language, true);

    /* Prompt */
    const textPrompt = `${inititialContextSentence} ${introductionSentence} ${summaryStorySentence} ${choiceChapterSentence} ${continueStorySentence} ${chapterFormatSentence}`;
    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
