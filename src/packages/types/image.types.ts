import { Visibility } from "./common.types";

export type ImageOnDb = {
    key: string;
    visibility: Visibility;
    plaiceholder: string;
};

export type ImageOnClient = {
    url: string;
    plaiceholder: string;
};

export type StoryBeingGeneratedChapterImageOnClient = {
    url: string;
    plaiceholder?: string;
};

export enum ImageDirectory {
    UNFINISHED_STORY = 'unfinished-story',
    FINISHED_STORY = 'finished-story',
}
