import { ObjectId } from 'mongoose';
import { NextApiRequest } from 'next';

import { CustomError } from '../../../packages/classes';
import { isDevEnv, publicStoriesPerPage } from '../../../packages/constants';
import { publicStoriesSearchSchema } from '../../../packages/schemas';

import type {
    FinishedPublicStoryPreview,
    FinishedStoryInstance,
    PublicStoriesSearchQuery,
    UnfinishedUserStoryInstance,
} from '../../../packages/types';

import { UnfinishedStory, FinishedStory } from '../models';
import { validQueryData } from '../functions';

export const getUserStoryPreviousFromDb = async (userId: ObjectId) => {
    const unfinishedStoriesPreviewsPromise = async () => {
        const unfinishedStoryprojection = ['cover', 'topic'];
        const allUnfinishedStories: UnfinishedUserStoryInstance[] = await UnfinishedStory.find(
            { userId },
            unfinishedStoryprojection
        );
        const unfinishedStoriesPreviewsPromiseArray = allUnfinishedStories.map(
            async (story) => await story.getPreview()
        );
        return Promise.all(unfinishedStoriesPreviewsPromiseArray);
    };
    const finishedUserStoryPreviewsPromise = async () => {
        const unfinishedStoryprojection = ['cover', 'topic', 'title', 'summary', 'options', 'visibility'];
        const allFinishedStories: FinishedStoryInstance[] = await FinishedStory.find(
            { userId },
            unfinishedStoryprojection
        );
        const finishedUserStoryPreviewsPromiseArray = allFinishedStories.map(
            async (story) => await story.getUserPreview()
        );
        return Promise.all(finishedUserStoryPreviewsPromiseArray);
    };
    const [unfinishedStoriesPreviews, finishedUserStoryPreviews] = await Promise.all([
        unfinishedStoriesPreviewsPromise(),
        finishedUserStoryPreviewsPromise(),
    ]);
    return { unfinishedStoriesPreviews, finishedUserStoryPreviews };
};

export const getStoriesPreviewsFromDb = async (
    req: NextApiRequest,
    onlyPublic: boolean,
    userId?: ObjectId | string
) => {
    const { search, theme, duration, language, page } = await validQueryData<PublicStoriesSearchQuery>(
        publicStoriesSearchSchema,
        req
    );
    const searchParams =
        typeof search === 'string' && search?.trim()
            ? {
                  $or: [
                      { title: { $regex: search, $options: 'i' } },
                      { topic: { $regex: search, $options: 'i' } },
                      { summary: { $regex: search, $options: 'i' } },
                  ],
              }
            : {};

    const filters: { [key: string]: any } = { theme, duration, language };

    Object.keys(filters).forEach((key) => {
        if (filters[key] === 'all') {
            delete filters[key];
        } else if (key === 'theme') {
            filters['options.theme'] = filters[key];
            delete filters[key];
        } else if (key === 'duration') {
            filters['options.duration'] = filters[key];
            delete filters[key];
        } else if (key === 'language') {
            filters['options.language'] = filters[key];
            delete filters[key];
        }
    });

    if (onlyPublic) {
        filters.visibility = 'public';
    }
    if (userId) {
        filters.userId = userId;
    }

    const options = { ...searchParams, ...filters };
    const total = await FinishedStory.find(options).count();
    const projection: (keyof FinishedPublicStoryPreview)[] = [
        'type',
        'title',
        'topic',
        'cover',
        'summary',
        'options',
        'ratings',
        'numbOfReviews',
    ];

    const query = FinishedStory.find(options, projection)
        .limit(publicStoriesPerPage)
        .skip(publicStoriesPerPage * (page - 1));

    if (onlyPublic) {
        query.populate({
            path: 'author',
            select: 'username avatar',
            match: { author: { $exists: true } },
        });
    }

    const stories: Partial<FinishedStoryInstance[]> = await query.exec();

    console.log(stories)

    const storiesPreviewsPromiseArray = stories.map(async (story) => await story?.getPublicPreview());

    const storiesPreviews = await Promise.all(storiesPreviewsPromiseArray);

    return {
        total,
        stories: storiesPreviews,
    };
};

export const getOneFinishedStoryById = async (storyId: ObjectId | string) => {
    const story: FinishedStoryInstance | undefined | null = await FinishedStory.findById(storyId).populate({
        path: 'author',
        select: 'username avatar',
        match: { author: { $exists: true } },
    });
    if (!story) {
        throw CustomError.BAD_REQUEST;
    }
    return story;
};

export const getOneUnfinishedStoryById = async (storyId: ObjectId | string) => {
    const story: UnfinishedUserStoryInstance | undefined | null = await UnfinishedStory.findById(storyId);
    if (!story) {
        throw CustomError.BAD_REQUEST;
    }
    return story;
};

export const deleteUnfinishedStoryFromDb = async (storyId: string | ObjectId, userId: ObjectId) => {
    const story: UnfinishedUserStoryInstance | undefined | null = await UnfinishedStory.findById(storyId);
    if (!story) {
        throw isDevEnv ? CustomError.INVALID_ID : CustomError.BAD_REQUEST;
    }
    if (!story.isAuthor(userId)) {
        throw CustomError.UNAUTHORIZED;
    }
    await story.deleteAllImages();
    await story.delete();
};
