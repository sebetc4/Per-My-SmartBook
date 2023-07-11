import {
    StoryReviewInstance,
    CreateOneReviewBody,
    CreateOneReviewRes,
    DeleteOnReviewQuery,
    DeleteOneReviewRes,
    UpdateOneReviewBody,
    UpdateOneReviewRes,
    GetStoryPreviewsQuery,
    LikeOrDislikeOneReviewBody,
    LikeOrDislikeOneReviewRes,
} from '~/packages/types';
import { authUser, catchControllerError, onSuccess, validBody, validQueryData, validQueryId } from '../functions';
import { StoryReview } from '../models';
import { CustomError } from '~/packages/classes';
import { getOneFinishedStoryById, getOneStoryReviewById, getStoryReviewsFromDb } from '../queries';
import {
    createOneReviewSchema,
    deleteOneReviewSchema,
    getStoryPreviewsSchema,
    likeOrDislikeOneReviewSchema,
} from '~/packages/schemas';
import { roundNearestTenth } from '~/packages/functions/number/number.functions';

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
    const { storyId, reviewNumber, start } = await validQueryData<GetStoryPreviewsQuery>(getStoryPreviewsSchema, req);
    const storyReviews = await getStoryReviewsFromDb(storyId, reviewNumber, start);
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
        throw CustomError.FORBIDDEN;
    }
    console.log('globalRating', roundNearestTenth((textRating + imageRating) / 2));
    const review = await StoryReview.create({
        story: storyId,
        author: user.id,
        title,
        text,
        ratings: {
            globalRating: roundNearestTenth((textRating + imageRating) / 2),
            textRating,
            imageRating,
        }
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
        throw CustomError.FORBIDDEN;
    }
    review.title = title;
    review.text = text;
    review.ratings.globalRating = roundNearestTenth((textRating + imageRating) / 2)
    review.ratings.textRating = textRating;
    review.ratings.imageRating = imageRating;
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
        throw CustomError.FORBIDDEN;
    }
    await review.delete();
    const story = await getOneFinishedStoryById(storyId);
    story.reviews = story.reviews.filter((review) => review.review.toString() !== reviewId);
    story.numbOfReviews--;
    await story.updateStoryRatings();
    onSuccess<DeleteOneReviewRes>(200, { storyRatings: story.ratings }, res);
});

export const likeOrDislikeOneReview = catchControllerError(async (req, res) => {
    const { reviewId, value } = await validBody<LikeOrDislikeOneReviewBody>(likeOrDislikeOneReviewSchema, req);
    const { id: userId } = await authUser(req);
    const review = await getOneStoryReviewById(reviewId);
    const lastVote = review.likes.find((like) => like.userId.toString() === userId);
    const lastValue = lastVote?.value;
    if ((!lastVote && value === 0) || lastValue === value) {
        throw CustomError.BAD_REQUEST;
    }
    if (value === 0) {
        review.likes = review.likes.filter((like) => like.userId.toString() !== userId);
        review.reviewRating -= lastVote!.value;
    } else {
        if (lastValue) {
            review.reviewRating -= lastValue;
            review.reviewRating += value;
            review.likes.map((like) => {
                if (like.userId.toString() === userId) {
                    like.value = value;
                }
                return like;
            });
        } else {
            review.reviewRating += value;
            review.likes.push({ userId, value });
        }
    }
    await review.save();
    onSuccess<LikeOrDislikeOneReviewRes>(200, { userHasAlreadyVoted: !!lastVote, lastValue, userId }, res);
});
