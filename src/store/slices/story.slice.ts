import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FinishedStoryData, StoryReviewData } from '~/packages/types';
import { CreateOneReviewBody, UpdateOneReviewBody } from '~/packages/types/request/review.types';
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
        setStoryDataAndUserPreview(
            state,
            action: PayloadAction<{ storyData: FinishedStoryData; userReview: StoryReviewData | null }>
        ) {
            const { storyData, userReview } = action.payload;
            state.isLoading = false;
            state.storyData = storyData;
            state.userReview = userReview;
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
            const { review, storyRating } = action.payload;
            state.userReview = review;
            state.isLoading = false;
            state.storyData!.rating = storyRating;
        });
        builder.addCase(createOneReview.rejected, (state, action) => {
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
            state.storyData!.rating = action.payload;
            state.userReview = null;
        });
        builder.addCase(deleteOneReview.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const createOneReview = createAsyncThunk<
    { review: StoryReviewData; storyRating: number },
    CreateOneReviewBody,
    { rejectValue: string }
>('story/createOneReview', async (body, { rejectWithValue }) => {
    try {
        const { data } = await api.createOneReview(body);
        return { review: data.review, storyRating: data.storyRating };
    } catch (err) {
        if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data.message);
        }
        throw err;
    }
});

export const updateOneReview = createAsyncThunk<
    { review: StoryReviewData; storyRating: number },
    UpdateOneReviewBody,
    { rejectValue: string }
>('story/updateOneReview', async (body, { rejectWithValue }) => {
    try {
        const { data } = await api.updateOneReview(body);
        return { review: data.review, storyRating: data.storyRating };
    } catch (err) {
        if (err instanceof AxiosError) {
            return rejectWithValue(err.response?.data.message);
        }
        throw err;
    }
});

export const deleteOneReview = createAsyncThunk<number, { storyId: string; reviewId: string }, { rejectValue: string }>(
    'story/deleteOneReview',
    async (data, { rejectWithValue }) => {
        try {
            const { reviewId, storyId } = data;
            const res = await api.deleteOneReview(reviewId, storyId);
            return res.data.storyRating;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const { setStoryDataAndUserPreview } = storySlice.actions;
export const storyReducer = storySlice.reducer;
