import { StoryThemeClass } from '../../../packages/classes';
import { enableLogTextPrompt } from '../../../packages/constants';
import { logIf } from '../../../packages/functions';
import { Language, StoryTheme } from '../../../packages/types';
import { getInitialContextSentence } from './common.prompt';

const getFormatSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return `Chaque idée d'histoire doit être composée de deux ou trois phrases. La réponse doit se présenter sous la forme d'un objet JSON au format : 
            {
                "englishTopics": ["idea 1", "idea 2", "idea 3", "idea 4"],
                "translatedTopics": ["traduction de l'idée 1", "traduction de l'idée 2", ""traduction de l'idée 3", "traduction de l'idée 4"]
            }
            The 'englishSubject' property contains a JSON array of the 4 ideas. 
            The 'translateSubject' property contains a JSON array of the 4 ideas translated into French.
            `;
        case 'en':
            return `Each story idea should be two or three sentences long. The answer must be in the form of a JSON object in the format: 
            {
                "allTopics": ["idea 1", "idea 2", "idea 3", "idea 4"],
            }`;
    }
};

const getIntroductionSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return `génères moi 4 sujet détaillés d'histoire sur le thème de:`;
        case 'en':
            return `generate 4 detailed story ideas with the topic:`;
    }
};

type GetUserStoryTopicsTextPromptProps = {
    theme: StoryTheme;
    language: Language;
};

export const getUserStoryTopicsTextPrompt = ({ theme, language }: GetUserStoryTopicsTextPromptProps) => {
    /* Story options */
    const themeSentence = StoryThemeClass.getSentence(theme, 'en');

    /* Senetences */
    const inititialContextSentence = getInitialContextSentence(language);
    const introductionSentence = getIntroductionSentence(language);
    const formatSentence = getFormatSentence(language);

    const textPrompt = `${inititialContextSentence} ${introductionSentence} ${themeSentence}. ${formatSentence}`;
    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
