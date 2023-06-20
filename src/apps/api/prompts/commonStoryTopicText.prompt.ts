import { StoryThemeClass } from '../../../packages/classes';
import { enableLogTextPrompt } from '../../../packages/constants';
import { logIf } from '../../../packages/functions';
import { Language, StoryTheme } from '../../../packages/types';
import { getInitialContextSentence } from './common.prompt';

const getFormatSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return `The idea should be two or three sentences long. The answer must be in the form of a JSON object with the following format: 
            {
                "englishTopic": "idea",
                "translatedTopic": "traduction de l'idée 1"
            }
            The 'englishTopic' property contains the idea. 
            The 'translatedTopic' property contains a the idea translated into French.
            `;
        case 'en':
            return `The idea should be two or three sentences long. The answer must be in the form of a JSON object with the following format: 
        {
            "topic": "idea"
        }`;
    }
};

type GetUserStoryTopicsTextPromptProps = {
    theme: StoryTheme;
    language: Language;
};

export const getCommonStoryTopicsTextPrompt = ({ theme, language }: GetUserStoryTopicsTextPromptProps) => {
    /* Story options */
    const themeSentence = StoryThemeClass.getSentence(theme, 'en');

    /* Senetences */
    const inititialContextSentence = getInitialContextSentence(language);
    const formatSentence = getFormatSentence(language);
    
    /* Prompt */
    const textPrompt = `${inititialContextSentence} generate one detailed story idea with ${themeSentence}. ${formatSentence}`;
    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
