import {
    CommonStoryChapter,
    FirstStoryChapterGenerated,
    LastStoryChapterGenerated,
    NextStoryChapterGenerated,
    OpenaiSettings,
    ParsedStoryChapterGenerated,
    UserStoryChapter,
} from '../../../../packages/types';
import { isValidFirstStoryChapterGenerated, isValidLastStoryChapterGenerated, isValidNextStoryChapterGenerated, parseAndValidData } from '../validation';

/**
 * Generate story chapter data
 */
export const generateFirstStoryChapterData = async (
    textPrompt: string,
    userOpenaiSettings: OpenaiSettings | false
): Promise<ParsedStoryChapterGenerated> => {
    const { title, text, choice1, choice2, choice3, description } = await parseAndValidData<FirstStoryChapterGenerated>(
        textPrompt,
        isValidFirstStoryChapterGenerated,
        userOpenaiSettings
    );
    return {
        title,
        text,
        allChoices: [{ text: choice1 }, { text: choice2 }, { text: choice3 }],
        description,
    };
};

export const generateNextStoryChapterData = async (
    textPrompt: string,
    userOpenaiSettings: OpenaiSettings | false
): Promise<ParsedStoryChapterGenerated> => {
    const { title, text, choice1, choice2, choice3, summary, description } = await parseAndValidData<NextStoryChapterGenerated>(
        textPrompt,
        isValidNextStoryChapterGenerated,
        userOpenaiSettings
    );
    return {
        title,
        text,
        summary,
        allChoices: [{ text: choice1 }, { text: choice2 }, { text: choice3 }],
        description,
    };
};

export const generateFinalStoryChapterData = async (
    textPrompt: string,
    userOpenaiSettings: OpenaiSettings | false
): Promise<ParsedStoryChapterGenerated> => {
    return await parseAndValidData<LastStoryChapterGenerated>(
        textPrompt,
        isValidLastStoryChapterGenerated,
        userOpenaiSettings
    );
};

/**
 * Handle chapter text
 */
export const joinAllChaptersText = (allChapter: UserStoryChapter[] | CommonStoryChapter[]) =>
    allChapter.map((chapter) => chapter.text).join(' ');
