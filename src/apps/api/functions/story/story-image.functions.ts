import { deleteFileFromS3, mooveFileFromS3 } from '../../configs';
import { convertToImageOnClient } from '..';

import {
    CommonStoryChapter,
    FinishedStoryChapter,
    FinishedStoryInstance,
    ImageOnDb,
    UserStoryChapter,
} from '../../../../packages/types';

/**
 * Moove all images of finished story
 */
export const mooveAllFinishedStoryImages = async (story: FinishedStoryInstance) => {
    const mooveCoverPromise = async () => {
        if (!story.cover) {
            return;
        }
        const fileKey = `finished-story/${story.id}/cover`;
        await mooveFileFromS3({
            visibility: story.visibility,
            source: story.cover,
            key: fileKey,
        });
        story.cover.key = fileKey;
        story.cover.visibility = story.visibility;
    };
    const mooveChapterImage = async (chapter: FinishedStoryChapter, index: number) => {
        if (!chapter.image) {
            return;
        }
        const fileKey = `finished-story/${story.id}/chapter${index + 1}`;
        await mooveFileFromS3({
            visibility: story.visibility,
            source: chapter.image!,
            key: fileKey,
        });
        story.allChapters[index].image!.key = fileKey;
        story.allChapters[index].image!.visibility = story.visibility;
    };
    const deleteAllChapterImagesPromise = () => {
        const promiseArray = story.allChapters.map((chapter, index) => mooveChapterImage(chapter, index));
        return Promise.all(promiseArray);
    };
    return Promise.all([mooveCoverPromise(), deleteAllChapterImagesPromise()]);
};

/**
 * Delete cover and all chapters images
 */
export const deleteCoverAndAllChaptersImages = (
    allChapters: UserStoryChapter[] | FinishedStoryChapter[],
    cover?: ImageOnDb
) => {
    const deleteAllChapterImagesPromise = () => {
        const promiseArray = allChapters.map((chapter) => chapter.image && deleteFileFromS3(chapter.image));
        return Promise.all(promiseArray);
    };
    return Promise.all([cover && deleteFileFromS3(cover), deleteAllChapterImagesPromise()]);
};

/**
 * Convert all chapters images to image on client
 */
export const convertAllChaptersImagesToImageOnClient = async (
    allChapters: UserStoryChapter[] | FinishedStoryChapter[]
) => {
    const allChaptersPromise = allChapters.map(async (chapter) => ({
        title: chapter.title,
        text: chapter.text,
        allChoices: chapter.allChoices,
        selectedChoiceIndex: chapter.selectedChoiceIndex,
        description: chapter.description,
        image: chapter.image && (await convertToImageOnClient(chapter.image)),
    }));
    return await Promise.all(allChaptersPromise);
};
