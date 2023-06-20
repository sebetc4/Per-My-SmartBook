import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
    DeleteUnfinishedUserStoryBody,
    FinishedUserStoryPreview,
    SocketEvent,
    SocketNamespace,
    UnfinishedUserStoryPreview,
    UserStoriesPreviews,
} from '../../packages/types';

import { api, sockets } from '../../services';

export type UserStoriesState = {
    isLoading: boolean;
    firstContentLoaded: boolean;
    unfinishedStoriesPreviews: UnfinishedUserStoryPreview[];
    finishedUserStoryPreviews: FinishedUserStoryPreview[];
    error: null | string;
};

const initialState: UserStoriesState = {
    isLoading: false,
    firstContentLoaded: false,
    unfinishedStoriesPreviews: [],
    finishedUserStoryPreviews: [],
    error: null,
};

export const userStoriesSlice = createSlice({
    name: 'userStories',
    initialState,
    reducers: {
        resetUserStoriesState: (state) => {
            state.isLoading = initialState.isLoading;
            state.firstContentLoaded = initialState.firstContentLoaded;
            state.unfinishedStoriesPreviews = initialState.unfinishedStoriesPreviews;
            state.finishedUserStoryPreviews = initialState.finishedUserStoryPreviews;
            state.error = initialState.error;
        },
        setAllUserStories: (state, action: PayloadAction<UserStoriesPreviews>) => {
            state.firstContentLoaded = true;
            state.unfinishedStoriesPreviews = action.payload.unfinishedStoriesPreviews;
            state.finishedUserStoryPreviews = action.payload.finishedUserStoryPreviews;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteUnfinishedStory.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteUnfinishedStory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.unfinishedStoriesPreviews = state.unfinishedStoriesPreviews.filter(
                (story) => story.id !== action.payload
            );
        });
        builder.addCase(deleteUnfinishedStory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const deleteUnfinishedStory = createAsyncThunk<string, string, { rejectValue: string }>(
    'userStories/deleteUnfinishedStory',
    async (id, { rejectWithValue }) => {
        try {
            await sockets.emit<DeleteUnfinishedUserStoryBody>(
                SocketNamespace.USER_STORIES,
                SocketEvent.DELETE_USER_STORY,
                { storyId: id }
            );
            await api.deleteUnfinishedStory(id);
            return id;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const { resetUserStoriesState, setAllUserStories } = userStoriesSlice.actions;

export const userStoriesReducer = userStoriesSlice.reducer;
