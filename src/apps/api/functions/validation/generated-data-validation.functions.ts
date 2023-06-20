import { CustomError } from '../../../../packages/classes';
import { enableLogGeneratedData } from '../../../../packages/constants';
import { logIf } from '../../../../packages/functions';
import {
    CommonStorySummaryAndTitleGenerated,
    FirstStoryChapterGenerated,
    LastStoryChapterGenerated,
    NextStoryChapterGenerated,
    OpenaiSettings,
    UserStorySummaryGenerated,
    UserStoryTopicsGenerated,
} from '../../../../packages/types';
import { sendOpenAiTextRequest } from '../../configs';

export const parseAndValidData = async <T>(
    textPrompt: string,
    validCb: (data: any) => boolean,
    openaiSettings: OpenaiSettings | false
): Promise<T> => {
    let count = 0;
    while (true) {
        const textResponse = await sendOpenAiTextRequest(textPrompt, openaiSettings);
        logIf(enableLogGeneratedData, { openaiResponse: textResponse!.data.choices[0].text! });
        let data;
        try {
            data = JSON.parse(textResponse!.data.choices[0].text!);
            logIf(enableLogGeneratedData, { parsedData: data });
            if (data && validCb(data)) {
                return data;
            } else {
                logIf(enableLogGeneratedData, { error: 'Parsed data invalid' });
            }
        } catch (err) {
            data = null;
            logIf(enableLogGeneratedData, { error: 'Error when passing data' });
        }
        if (++count >= 3) {
            logIf(enableLogGeneratedData, { error: 'Number of trials reached, end of generation!!' });
            throw CustomError.INTERNAL_SERVER_ERROR;
        }
    }
};

const isTypeOfString = (value: any): boolean => {
    return typeof value === 'string';
};

const isObject = (obj: any): boolean => Object.prototype.toString.call(obj) === '[object Object]';

const isValidArray = (arr: any[], length: number): boolean => {
    if (!Array.isArray(arr) || arr.length !== length) return false;
    let valid = true;
    arr.forEach((element) => {
        if (!isTypeOfString(element)) valid = false;
    });
    return valid;
};

/**
 * Valid story topics
 */
export const isValidUserStoryTopicsGenerated = (obj: any): obj is UserStoryTopicsGenerated => {
    return (
        isObject(obj) &&
        obj.englishTopics &&
        isValidArray(obj.englishTopics, 4) &&
        obj.translatedTopics &&
        isValidArray(obj.translatedTopics, 4)
    );
};

export const isValidUserStoryTopicsGeneratedEn = (obj: any): obj is UserStoryTopicsGenerated => {
    return isObject(obj) && obj.allTopics && isValidArray(obj.allTopics, 4);
};

export const isValidCommonStoryTopicGenerated = (obj: any): obj is UserStoryTopicsGenerated => {
    return (
        isObject(obj) &&
        obj.englishTopic &&
        isTypeOfString(obj.englishTopic) &&
        obj.translatedTopic &&
        isTypeOfString(obj.translatedTopic)
    );
};

export const isValidCommonStoryTopicGeneratedEn = (obj: any): obj is UserStoryTopicsGenerated => {
    return isObject(obj) && obj.topic && isTypeOfString(obj.topic);
};

/**
 * Valid story chapter
 */
export const isValidFirstStoryChapterGenerated = (obj: any): obj is FirstStoryChapterGenerated => {
    return (
        isObject(obj) &&
        isTypeOfString(obj.title) &&
        isTypeOfString(obj.text) &&
        isTypeOfString(obj.choice1) &&
        isTypeOfString(obj.choice2) &&
        isTypeOfString(obj.choice3) &&
        isTypeOfString(obj.description)
    );
};

export const isValidNextStoryChapterGenerated = (obj: any): obj is NextStoryChapterGenerated => {
    return (
        isObject(obj) &&
        isTypeOfString(obj.title) &&
        isTypeOfString(obj.text) &&
        isTypeOfString(obj.summary) &&
        isTypeOfString(obj.choice1) &&
        isTypeOfString(obj.choice2) &&
        isTypeOfString(obj.choice3) &&
        isTypeOfString(obj.description)
    );
};

export const isValidLastStoryChapterGenerated = (obj: any): obj is LastStoryChapterGenerated => {
    return isObject(obj) && isTypeOfString(obj.title) && isTypeOfString(obj.text) && isTypeOfString(obj.description);
};

/**
 * Valid user story summary
 */
export const isValidUserStorySummaryGenerated = (obj: any): obj is UserStorySummaryGenerated => {
    return isObject(obj) && obj.summary && isTypeOfString(obj.summary);
};

/**
 * Valid common story summary and title
 */
export const isValidCommonStorySummaryAndTitleGenerated = (obj: any): obj is CommonStorySummaryAndTitleGenerated => {
    return isObject(obj) && obj.summary && isTypeOfString(obj.summary) && obj.title && isTypeOfString(obj.title);
};
