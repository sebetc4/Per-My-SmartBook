import { enableLogTextPrompt } from '../../../packages/constants';
import { logIf } from '../../../packages/functions';
import { Language} from '../../../packages/types';
import { getInitialContextSentence } from './common.prompt';


const getIntroductionSentence = (language: Language, allTextStory: string): string => {
    switch (language) {
        case 'fr':
            return `Donner un titre et faire un résumé pour cette histoire: ${allTextStory}.`;
        case 'en':
            return `Give a title and make a summary for this story: ${allTextStory}.`;
    }
};

const getFormatSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return `La réponse doit être sous forme d'un objet JSON avec le format: 
            {
                "summary": "résumé de l'histoire", 
                "title": "titre de l'histoire"
            }`;
        case 'en':
            return `The response must be in the form of a JSON object with the format: 
            {
                "summary": "summary of the story", 
                "title": "title of the story"
            }`;
    }
};

type generateStorySummaryPromptProps = {
    allTextStory: string;
    language: Language;
};

export const generateStorySummaryAndTitlePrompt = ({ allTextStory, language }: generateStorySummaryPromptProps) => {

    /* Sentences */
    const inititialContextSentence = getInitialContextSentence(language);
    const introductionSentence = getIntroductionSentence(language, allTextStory);
    const formatSentence = getFormatSentence(language);


    const textPrompt = `${inititialContextSentence} ${introductionSentence} ${formatSentence}`;
    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
