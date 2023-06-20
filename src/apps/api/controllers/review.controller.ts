import { StoryReviewInstance } from '~/packages/types';
import { authUser, catchControllerError, onSuccess, validBody, validQueryData, validQueryId } from '../functions';
import { StoryReview } from '../models';
import { CustomError } from '~/packages/classes';
import { getOneFinishedStoryById, getOneStoryReviewById, getStoryPreviewsFromDb } from '../queries';
import {
    CreateOneReviewBody,
    CreateOneReviewRes,
    DeleteOnReviewQuery,
    DeleteOneReviewRes,
    UpdateOneReviewBody,
    UpdateOneReviewRes,
} from '~/packages/types/request/review.types';
import { createOneReviewSchema, deleteOneReviewSchema } from '~/packages/schemas/review.schemas';

export const getOneStoryReview = catchControllerError(async (req, res) => {
    const id = validQueryId(req);
    const review: StoryReviewInstance | null = await StoryReview.findById(id);
    if (!review) {
        throw CustomError.INVALID_ID;
    }
    const reviewData = review.getData();
    onSuccess(200, { review: reviewData }, res);
});

export const getStoryReviews = catchControllerError(async (req, res) => {
    const storyReviews = await getStoryPreviewsFromDb(req);
    onSuccess(200, { storyReviews }, res);
});

export const createOneReview = catchControllerError(async (req, res) => {
    const { storyId, title, text, textRating, imageRating } = await validBody<CreateOneReviewBody>(
        createOneReviewSchema,
        req
    );
    const user = await authUser(req);
    const story = await getOneFinishedStoryById(storyId);
    if (story.hasVoted(user.id)) {
        console.log('has voted');
        throw CustomError.FORBIDEN;
    }
    const review = await StoryReview.create({
        story: storyId,
        author: user.id,
        title,
        text,
        textRating,
        imageRating,
    });

    story.reviews.push({ author: user.id, review: review.id });
    story.numbOfReviews++;
    await story.updateStoryRatings();
    const reviewData = review.getData();
    onSuccess<CreateOneReviewRes>(201, { review: reviewData, storyRatings: story.ratings }, res);
});

export const updateOneReview = catchControllerError(async (req, res) => {
    const { storyId, reviewId, title, text, textRating, imageRating } = await validBody<UpdateOneReviewBody>(
        deleteOneReviewSchema,
        req
    );
    const user = await authUser(req);
    const review = await getOneStoryReviewById(reviewId);
    if (!review.isAuthor(user.id)) {
        throw CustomError.FORBIDEN;
    }
    review.title = title;
    review.text = text;
    review.textRating = textRating;
    review.imageRating = imageRating;
    await review.save();
    const reviewData = review.getData();
    const story = await getOneFinishedStoryById(storyId);
    await story.updateStoryRatings();
    onSuccess<UpdateOneReviewRes>(200, { review: reviewData, storyRatings: story.ratings }, res);
});

export const deleteOneReview = catchControllerError(async (req, res) => {
    const { storyId, reviewId } = await validQueryData<DeleteOnReviewQuery>(deleteOneReviewSchema, req);
    const user = await authUser(req);
    const review = await getOneStoryReviewById(reviewId);
    if (!review.isAuthor(user.id)) {
        throw CustomError.FORBIDEN;
    }
    await review.delete();
    const story = await getOneFinishedStoryById(storyId);
    story.reviews = story.reviews.filter((review) => review.review.toString() !== reviewId);
    story.numbOfReviews--;
    await story.updateStoryRatings();
    onSuccess<DeleteOneReviewRes>(200, { storyRatings: story.ratings }, res);
});
