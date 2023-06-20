import { StoryImageStyleClass, StoryThemeClass } from "../../../../../packages/classes";
import { StoryOptions } from "../../../../../packages/types";
import { generateRandomBytes } from "../../../functions";

export const generateCommonStoryIdAndOptions = () => {
    const storyId = generateRandomBytes(12);
    const storyOptions: StoryOptions = {
        theme: StoryThemeClass.getRandomValue(),
        style: StoryImageStyleClass.getRandomValue(),
        duration: 'veryShort',
        language: 'fr',
    };
    return { storyId, storyOptions}
}