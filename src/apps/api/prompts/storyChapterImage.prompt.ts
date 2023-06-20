import { StoryImageStyleClass } from '../../../packages/classes';
import { enableLogTextPrompt } from '../../../packages/constants';
import { logIf } from '../../../packages/functions';
import { StoryImageStyle } from '../../../packages/types';

export const getUserStoryChapterImagePrompt = (description: string, style: StoryImageStyle) => {
    /* Story options */
    const styleSentence = StoryImageStyleClass.getSentence(style);

    /* Prompt */
    const textPrompt = `${description} ${styleSentence}`;
    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
