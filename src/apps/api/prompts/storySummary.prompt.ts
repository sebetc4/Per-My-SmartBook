import { enableLogTextPrompt } from '../../../packages/constants';
import { logIf } from '../../../packages/functions';
import { Language } from '../../../packages/types';
import { getInitialContextSentence } from './common.prompt';

const getIntroductionSentence = (language: Language, allTextStory: string): string => {
    switch (language) {
        case 'fr':
            return `Faire résumé de cette histoire: ${allTextStory}.`;
        case 'en':
            return `Summarize this story: ${allTextStory}.`;
    }
};

const getLastChapterSentence = (language: Language): string => {
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
            return `La réponse doit être sous forme d'un objet JSON avec le format: 
                    {
                        "summary": "résumé de l'histoire", 
                    }`;
        case 'en':
            return `The response must be in the form of a JSON object with the format: 
            {
                "summary": "summary of the story", 
            }`;
    }
};

type generateStorySummaryPromptProps = {
    allTextStory: string;
    language: Language;
};

export const generateStorySummaryPrompt = ({ allTextStory, language }: generateStorySummaryPromptProps) => {
    /* Sentences */
    const inititialContextSentence = getInitialContextSentence(language);
    const introductionSentence = getIntroductionSentence(language, allTextStory);
    const lastChapterSentence = getLastChapterSentence(language);
    const formatSentence = getFormatSentence(language);

    const textPrompt = `${inititialContextSentence} ${introductionSentence} ${lastChapterSentence} ${formatSentence}`;

    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
