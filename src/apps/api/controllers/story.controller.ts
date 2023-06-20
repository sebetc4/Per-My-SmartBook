import {
    deleteUnfinishedStoryFromDb,
    getStoriesPreviewsFromDb,
    getOneFinishedStoryById,
    getUserStoryPreviousFromDb,
} from '../queries';
import { catchControllerError, authUser, authUserAndSession, validQueryId, onSuccess } from '../functions';

export const getOneStory = catchControllerError(async (req, res) => {
    const id = validQueryId(req);
    const story = await getOneFinishedStoryById(id);
    if (story.visibility === 'private') {
        const {id: userId} = await authUser(req, res);
        story.isAuthor(userId)
    }
    const storyData = await story.getData();
    onSuccess(200, { story: storyData }, res);
});

export const getPublicStoriesPreviews = catchControllerError(async (req, res) => {
    const {total, stories} = await getStoriesPreviewsFromDb(req, true);
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
