import { StoryImageStyleClass } from "../../../packages/classes";
import { enableLogTextPrompt } from "../../../packages/constants";
import { logIf } from "../../../packages/functions";
import { StoryImageStyle } from "../../../packages/types";

export const getStoryTopicImagePrompt = (description: string, style: StoryImageStyle) => {
    const styleSentence = StoryImageStyleClass.getSentence(style);
    const textPrompt = `${description}, Book Cover, ${styleSentence}`;
    logIf(enableLogTextPrompt, { textPrompt });
    return textPrompt;
};
