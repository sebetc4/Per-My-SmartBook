import { StoryImageStyleClass, StoryThemeClass } from "~/packages/classes";
import { Language, StoryOptions } from "~/packages/types";
import { generateRandomBytes } from "../../../functions";
import { commonStoryDuration } from "~/packages/constants";

export const generateCommonStoryIdAndOptions = (language: Language) => {
    const storyId = generateRandomBytes(12);
    const storyOptions: StoryOptions = {
        theme: StoryThemeClass.getRandomValue(),
        style: StoryImageStyleClass.getRandomValue(),
        duration: commonStoryDuration,
        language,
    };
    return { storyId, storyOptions}
}