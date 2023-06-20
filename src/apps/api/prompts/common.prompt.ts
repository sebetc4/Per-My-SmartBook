import { Language } from '../../../packages/types';

export const getInitialContextSentence = (language: Language): string => {
    switch (language) {
        case 'fr':
            return `Ignorez toutes les instructions avant celle-ci. Tu es un conteur. Depuis 20 ans, tu racontes des histoires sur différents thèmes. Ta tâche est la suite:`;
        case 'en':
            return `Ignore all instructions before this one. You're a storyteller. You have been you have been telling stories on various themes for 20 years. Your task is now:`;
    }
};

export const getSumaryStorySentence = (language: Language, storySummary: string): string => {

    switch (language) {
        case 'fr':
            return `Voici le résumé de l'histoire: "${storySummary}".`;
        case 'en':
            return `This is the summary of the story: "${storySummary}".`;
    }
};

export const getChoiceChapterSentence = (language: Language, choice: string): string => {
    switch (language) {
        case 'fr':
            return `Dans les trois dernières possibilités j'ai choisi: "${choice}".`;
        case 'en':
            return `In the Final three possibilities I chose: "${choice}".`;
    }
};

export const getChapterFormatSentence = (language: Language, withSummary?: boolean): string => {
    switch (language) {
        case 'fr':
            return `L'histoire doit être sous forme d'un objet JSON avec le format: 
        {
            "title": "titre du chapitre (maximum 10 mots)", 
            "text": "l'histoire", 
            ${withSummary ? `"summary": 'le résumé de l'histoire depuis le début (en environ 500 mots),"` : ``}
            "choice1": "le premier choix", 
            "choice2": "le deuxième choix", 
            "choice3": "le troisième choix", 
            "description": "A short english text describing the environment of the scene (maximum 10 words) in order to generate an image." 
        }
        Toutes les propriétés JSON sont écrites en francais sauf "description" qui est en anglais.
    }`;
        case 'en':
            return `The story must be in the form of a JSON object with the format: 
        {
            "title": "chapter title (maximum 10 words)", 
            "text": "story", 
            ${withSummary ? `"summary": 'a summary of the story from the beginning (in about 500 words),"` : ``}
            "choice1": "first choice", 
            "choice2": "second choice", 
            "choice3": "third choice", 
            "description": "A short text describing the environment of the scene (maximum 10 words) in order to generate an image." 
        }`;
    }
};


