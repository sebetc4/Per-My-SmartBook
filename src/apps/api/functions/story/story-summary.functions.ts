import { CommonStoryChapter, CommonStorySummaryAndTitleGenerated, Language, OpenaiSettings, UserStoryChapter, UserStorySummaryGenerated } from '../../../../packages/types';
import { generateStorySummaryAndTitlePrompt, generateStorySummaryPrompt } from '../../prompts';
import { parseAndValidData, isValidUserStorySummaryGenerated, isValidCommonStorySummaryAndTitleGenerated } from '../validation';
import { joinAllChaptersText } from '.';

export const generateStorySummary = async (
    allChapter: UserStoryChapter[],
    language: Language,
    userOpenaiSettings: OpenaiSettings
) => {
    const allTextStory = joinAllChaptersText(allChapter);
    const textPrompt = generateStorySummaryPrompt({ allTextStory, language });
    const { summary } = await parseAndValidData<UserStorySummaryGenerated>(
        textPrompt,
        isValidUserStorySummaryGenerated,
        userOpenaiSettings
    );
    return summary;
};

export const generateStorySummaryAndTitle = async (allChapter: CommonStoryChapter[], language: Language) => {
    const allTextStory = joinAllChaptersText(allChapter);
    const textPrompt = generateStorySummaryAndTitlePrompt({ allTextStory, language });
    const { summary, title } = await parseAndValidData<CommonStorySummaryAndTitleGenerated>(
        textPrompt,
        isValidCommonStorySummaryAndTitleGenerated,
        false
    );
    return { summary, title };
};
