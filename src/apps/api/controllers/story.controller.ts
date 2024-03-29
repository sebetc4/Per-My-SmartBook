import {
    deleteUnfinishedStoryFromDb,
    getStoriesPreviewsFromDb,
    getOneFinishedStoryById,
    getUserStoryPreviousFromDb,
    getStoryReviewsFromDb,
} from '../queries';
import { catchControllerError, authUser, authUserAndSession, validQueryId, onSuccess } from '../functions';
import { Visibility } from '~/packages/types';

export const getOneStory = catchControllerError(async (req, res) => {
    const id = validQueryId(req);
    const story = await getOneFinishedStoryById(id);
    if (story.visibility === Visibility.PRIVATE) {
        const { id: userId } = await authUser(req, res);
        story.isAuthor(userId);
    }
    const storyData = await story.getData();
    onSuccess(200, { story: storyData }, res);
});

export const getOneStoryAndReviews = catchControllerError(async (req, res) => {
    const id = validQueryId(req);
    const story = await getOneFinishedStoryById(id);
    if (story.visibility === Visibility.PRIVATE) {
        const { id: userId } = await authUser(req, res);
        story.isAuthor(userId);
    }
    const reviews = await getStoryReviewsFromDb(story.id, 10, 0);
    const storyData = await story.getData();
    const reviewsData = reviews.map((review) => review.getData());
    onSuccess(200, { story: storyData, reviews: reviewsData }, res);
});

export const getPublicStoriesPreviews = catchControllerError(async (req, res) => {
    const { total, stories } = await getStoriesPreviewsFromDb(req, true);
    onSuccess(200, { total, stories }, res);
});

export const getUserStoriesPreviewsAndSession = catchControllerError(async (req, res) => {
    const { user, session } = await authUserAndSession(req, res);
    const data = user && (await getUserStoryPreviousFromDb(user.id));
    onSuccess(200, { ...data, session }, res);
});

export const deleteUnfinishedStory = catchControllerError(async (req, res) => {
    const storyId = validQueryId(req);
    const { id: userId } = await authUser(req, res);
    await deleteUnfinishedStoryFromDb(storyId, userId);
    onSuccess(200, { message: 'Story being generated successfuly deleted' }, res);
});
