import { StoryThemeClass } from '../../../packages/classes';
import { enableLogTextPrompt } from '../../../packages/constants';
import { logIf } from '../../../packages/functions';
import { Language, StoryChapterChoice, StoryTheme } from '../../../packages/types';
import { getChoiceChapterSentence, getInitialContextSentence, getSumaryStorySentence } from './common.prompt';

const getIntroductionSentence = (language: Language, themeSentence: string): string => {
    switch (language) {
        case 'fr':
            return `Nous sommes au dernier chapitre d'une histoire détaillée à choix multiple sur ${themeSentence}.`;
        case 'en':
            return `We are at the Final chapter of a detailed multiple choice story on ${themeSentence}.`;
    }
};

const getFinalChapterSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return "Généres moi la fin de l'histoire.";
        case 'en':
            return 'Give me the end of the story.';
    }
};

const getFormatSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return `La fin de l'histoire doit être sous forme d'un objet JSON avec le format: 
            {
                "title": "titre du chapitre (maximum 10 mots)", 
                "text": "fin de l'histoire", 
                "description": "A short english text describing the environment of the scene (maximum 10 words) in order to generate an image." 
            }
            Toute les propriétés JSON sont écrites en francais sauf "description" qui est en anglais.
            `;
        case 'en':
            return `The end of the story must be in the form of a JSON object with the format:
            {
                "title": "title of the Final chapter (maximum 10 words)", 
                "text": "end of story", 
                "description": "A short text describing the environment of the scene (maximum 10 words) in order to generate an image." 
            }
            `;
    }
};
type GetStoryFinalChapterTextPromptParams = {
    theme: StoryTheme;
    storySummary: string;
    choice: string
    language: Language;
};

export const getStoryFinalChapterTextPrompt = ({
    theme,
    choice,
    storySummary,
    language,
}: GetStoryFinalChapterTextPromptParams) => {
    /* Story options */
    const themeSentence = StoryThemeClass.getSentence(theme, language);

    /* Sentences */
    const inititialContextSentence = getInitialContextSentence(language);
    const introductionSentence = getIntroductionSentence(language, themeSentence!);
    const summaryStorySentence = getSumaryStorySentence(language, storySummary);
    const choiceChapterSentence = getChoiceChapterSentence(language, choice);
    const FinalChapterSentence = getFinalChapterSentence(language);
    const formatSentence = getFormatSentence(language);

    /* Prompt */
    const textPrompt = `${inititialContextSentence} ${introductionSentence} ${summaryStorySentence} ${choiceChapterSentence} ${FinalChapterSentence} ${formatSentence}`;
    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
