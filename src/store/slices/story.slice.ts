import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    FinishedStoryData,
    StoryReviewData,
    CreateOneReviewBody,
    CreateOneReviewRes,
    DeleteOnReviewQuery,
    DeleteOneReviewRes,
    UpdateOneReviewBody,
    UpdateOneReviewRes,
    LikeOrDislikeOneReviewBody,
} from '~/packages/types';
import { api } from '~/services';
import { AxiosError } from 'axios';

type StoryState = {
    isLoading: boolean;
    storyData: FinishedStoryData | null;
    userReview: StoryReviewData | null;
    allReviews: StoryReviewData[];
    error: string | null;
};

const initialState: StoryState = {
    isLoading: false,
    storyData: null,
    userReview: null,
    allReviews: [],
    error: null,
};

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setStoryDataAndReviews(
            state,
            action: PayloadAction<{
                storyData: FinishedStoryData;
                userReview: StoryReviewData | null;
                reviews: StoryReviewData[];
            }>
        ) {
            const { storyData, userReview, reviews } = action.payload;
            state.isLoading = false;
            state.storyData = storyData;
            state.userReview = userReview;
            state.allReviews = reviews;
        },
    },
    extraReducers: (builder) => {
        /**
         * Create one review
         */
        builder.addCase(createOneReview.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createOneReview.fulfilled, (state, action) => {
            const { review, storyRatings } = action.payload;
            state.userReview = review;
            state.isLoading = false;
            state.storyData!.ratings = storyRatings;
            state.storyData!.numbOfReviews++;
        });
        builder.addCase(createOneReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Update one review
         */
        builder.addCase(updateOneReview.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateOneReview.fulfilled, (state, action) => {
            const { review, storyRatings } = action.payload;
            state.userReview = review;
            state.isLoading = false;
            state.storyData!.ratings = storyRatings;
            state.allReviews = state.allReviews.map((review) =>
                review.id === action.payload.review.id ? action.payload.review : review
            );
        });
        builder.addCase(updateOneReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Delete one review
         */
        builder.addCase(deleteOneReview.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteOneReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.storyData!.ratings = action.payload.storyRatings;
            state.userReview = null;
            state.allReviews = state.allReviews.filter((review) => review.id !== action.payload.reviewId);
            state.storyData!.numbOfReviews--;
        });
        builder.addCase(deleteOneReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Like or dislike one review
         */
        builder.addCase(likeOrDislikeOneReview.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(likeOrDislikeOneReview.fulfilled, (state, action) => {
            state.isLoading = false;
            const { reviewId, value, userId, userHasAlreadyVoted, lastValue } = action.payload;
            const review = state.allReviews.find((review) => review.id === reviewId);
            if (value === 0) {
                review!.likes = review!.likes.filter((like) => like.userId !== userId);
                review!.reviewRating -= lastValue!;
            } else {
                if (userHasAlreadyVoted) {
                    review!.likes = review!.likes.map((like) => (like.userId !== userId ? like : { ...like, value }));
                    review!.reviewRating -= lastValue!;
                    review!.reviewRating += value;
                } else {
                    review!.likes.push({ userId, value });
                    review!.reviewRating += value;
                }
            }
        });
        builder.addCase(likeOrDislikeOneReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const createOneReview = createAsyncThunk<CreateOneReviewRes, CreateOneReviewBody, { rejectValue: string }>(
    'story/createOneReview',
    async (body, { rejectWithValue }) => {
        try {
            const { data } = await api.createOneReview(body);
            return { review: data.review, storyRatings: data.storyRatings };
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const updateOneReview = createAsyncThunk<UpdateOneReviewRes, UpdateOneReviewBody, { rejectValue: string }>(
    'story/updateOneReview',
    async (body, { rejectWithValue }) => {
        try {
            const { data } = await api.updateOneReview(body);
            return { review: data.review, storyRatings: data.storyRatings };
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const deleteOneReview = createAsyncThunk<
    DeleteOneReviewRes & { reviewId: string },
    DeleteOnReviewQuery,
    { rejectValue: string }
>('story/deleteOneReview', async (body, { rejectWithValue }) => {
    try {
        const { reviewId, storyId } = body;
        const res = await api.deleteOneReview(reviewId, storyId);
        return { storyRatings: res.data.storyRatings, reviewId };
    } catch (err) {
        if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data.message);
        }
        throw err;
    }
});

export const likeOrDislikeOneReview = createAsyncThunk<
    { reviewId: string; value: number; userId: string; userHasAlreadyVoted: boolean; lastValue?: number },
    LikeOrDislikeOneReviewBody,
    { rejectValue: string }
>('story/likeOrDislikeOneReview', async (body, { rejectWithValue }) => {
    try {
        const { reviewId, value } = body;
        const { data } = await api.likeOrDislikeOneReview(body);
        const { userHasAlreadyVoted, userId, lastValue } = data;
        return { reviewId, value, userId, userHasAlreadyVoted, lastValue };
    } catch (err) {
        if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data.message);
        }
        throw err;
    }
});

export const { setStoryDataAndReviews } = storySlice.actions;
export const storyReducer = storySlice.reducer;
