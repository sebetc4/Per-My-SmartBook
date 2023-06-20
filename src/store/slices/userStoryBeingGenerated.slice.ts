import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sockets } from '../../services';
import { handleOpenAIErrorOnStore } from '../../apps/front/utils';
import { AppState } from '../store';

import {
    SelectUserStoryOptionsBody,
    SocketEvent,
    UserStoryChapterDataRes,
    SelectUserStoryTopicBody,
    UserStoryChapterImageRes,
    SelectUserStoryStoryChapterChoiceBody,
    UserStoryStoryChapterChoiceIsSelectedRes,
    SaveFinishedUserStoryBody,
    SocketNamespace,
    UserStoryBeingGeneratedData,
    UserStoryTopicsDataRes,
    UserStoryTopicsImagesRes,
    ResumeUserStoryBody,
} from '../../packages/types';
import {
    userBeingGeneratedStoryData,
    userChoiceTopicData,
    userFinishedStoryData,
    useUserBeingGeneratedStoryScreen,
    useUserChoiceTopicScreen,
    useUserFinishedStoryScreen,
} from '../../packages/constants';

export type UserStoryBeingGeneratedState = {
    isLoading: boolean;
    data: UserStoryBeingGeneratedData;
    error: null | string;
};

const initialState: UserStoryBeingGeneratedState = useUserChoiceTopicScreen
    ? userChoiceTopicData
    : useUserBeingGeneratedStoryScreen
    ? userBeingGeneratedStoryData
    : useUserFinishedStoryScreen
    ? userFinishedStoryData
    : {
          isLoading: false,
          data: {
              id: null,
              state: 'selectOptions',
              currentStep: 0,
              allTopics: [],
              allChapters: [],
          },
          error: null,
      };

export const userStoryBeingGeneratedSlice = createSlice({
    name: 'userStoryBeingGenerated',
    initialState,
    reducers: {
        /**
         * Reset state
         */
        resetUserStoryBeingGeneratedState(state) {
            state.isLoading = initialState.isLoading;
            state.data = initialState.data;
            state.error = initialState.error;
        },

        /**
         * Remove error
         */
        removeUserStoryBeingGeneratedError(state) {
            state.error = null;
        },

        /**
         * Story topics
         */
        setUserStoryTopicsData(state, action: PayloadAction<UserStoryTopicsDataRes>) {
            state.data.state = 'selectTopic';
            state.data.id = action.payload.storyId;
            state.data.allTopics = action.payload.allTopics;
        },
        setUserStoryTopicsImages(state, action: PayloadAction<UserStoryTopicsImagesRes>) {
            state.data.allTopics?.forEach((topic, i) => (topic.imageUrl = action.payload.allImagesUrl[i]));
        },

        /**
         * Story chapter
         */
        setUserUserStoryStoryChapterChoiceIsSelectedRes(
            state,
            action: PayloadAction<UserStoryStoryChapterChoiceIsSelectedRes>
        ) {
            state.isLoading = true;
            state.data.allChapters.at(-1)!.selectedChoiceIndex = action.payload.selectedChoiceIndex;
        },
        setUserStoryChapterDataRes(state, action: PayloadAction<UserStoryChapterDataRes>) {
            const { chapterIndex, chapter, isEnd } = action.payload;
            state.data.state = isEnd ? 'finished' : 'generating';
            state.data.currentStep = chapterIndex + 1;
            state.data.allChapters[chapterIndex] = chapter;
        },
        setUserUserStoryChapterImageRes(state, action: PayloadAction<UserStoryChapterImageRes>) {
            const { chapterIndex, imageUrl } = action.payload;
            state.data.allChapters[chapterIndex].image = { url: imageUrl };
        },
        setUserStoryChapterIsGenerated(state) {
            state.isLoading = false;
        },

        /**
         * Story Is Deleted
         */
        setUserStoryIsDeleted(state) {
            state.isLoading = false;
            state.data = {
                ...initialState.data,
                state: 'selectOptions',
            };
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        /**
         * Resume A Story
         */
        builder.addCase(resumeUserStory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(resumeUserStory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(resumeUserStory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });

        /**
         * Select Story Options
         */
        builder.addCase(selectUserStoryOptions.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(selectUserStoryOptions.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(selectUserStoryOptions.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });

        /**
         * Select Story topic
         */
        builder.addCase(selectUserStoryTopic.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(selectUserStoryTopic.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(selectUserStoryTopic.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });

        /**
         * Select Story Chapter Choice
         */
        builder.addCase(selectUserStoryStoryChapterChoice.pending, (state, action) => {
            state.isLoading = true;
            state.data.allChapters.at(-1)!.selectedChoiceIndex = action.meta.arg;
            state.error = null;
        });
        builder.addCase(selectUserStoryStoryChapterChoice.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(selectUserStoryStoryChapterChoice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });

        /**
         * Save Finished Story
         */
        builder.addCase(saveUserFinishedStory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(saveUserFinishedStory.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(saveUserFinishedStory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    },
});

export const resumeUserStory = createAsyncThunk<UserStoryBeingGeneratedData, string, { rejectValue: string }>(
    'userStoryBeingGenerated/resumeUserStory',
    async (storyId, { dispatch }) => {
        try {
            const { story } = await sockets.emit<ResumeUserStoryBody>(
                SocketNamespace.USER_STORIES,
                SocketEvent.RESUME_USER_STORY,
                {
                    storyId,
                }
            );
            return story;
        } catch (err) {
            handleOpenAIErrorOnStore(err, dispatch, 'error.userStoryBeingGenerated.resume-story');
        }
    }
);

export const selectUserStoryOptions = createAsyncThunk<void, SelectUserStoryOptionsBody>(
    'userStoryBeingGenerated/selectUserStoryOptions',
    async (options, { dispatch }) => {
        try {
            await sockets.emit<SelectUserStoryOptionsBody>(
                SocketNamespace.USER_STORIES,
                SocketEvent.SELECT_USER_STORY_OPTIONS,
                options
            );
        } catch (err) {
            handleOpenAIErrorOnStore(err, dispatch, 'error.userStoryBeingGenerated.select-story-options');
        }
    }
);

export const selectUserStoryTopic = createAsyncThunk<void, number, { state: AppState }>(
    'userStoryBeingGenerated/selectUserStoryTopic',
    async (selectedTopicIndex, { dispatch, getState }) => {
        try {
            const { userStoryBeingGenerated: story } = getState();
            await sockets.emit<SelectUserStoryTopicBody>(
                SocketNamespace.USER_STORIES,
                SocketEvent.SELECT_USER_STORY_TOPIC,
                {
                    storyId: story.data.id!,
                    selectedTopicIndex,
                }
            );
        } catch (err) {
            handleOpenAIErrorOnStore(err, dispatch, 'error.userStoryBeingGenerated.select-story-topic');
        }
    }
);

export const selectUserStoryStoryChapterChoice = createAsyncThunk<void, number, { state: AppState }>(
    'userStoryBeingGenerated/selectUserStoryStoryChapterChoice',
    async (selectedChoiceIndex, { dispatch, getState }) => {
        try {
            const { userStoryBeingGenerated: story } = getState();
            await sockets.emit<SelectUserStoryStoryChapterChoiceBody>(
                SocketNamespace.USER_STORIES,
                SocketEvent.SELECT_USER_STORY_CHAPTER_CHOICE,
                {
                    storyId: story.data.id!,
                    selectedChoiceIndex,
                }
            );
        } catch (err) {
            handleOpenAIErrorOnStore(err, dispatch, 'error.userStoryBeingGenerated.select-chapter-choice');
        }
    }
);

export const saveUserFinishedStory = createAsyncThunk<
    string,
    Omit<SaveFinishedUserStoryBody, 'storyId'>,
    { state: AppState }
>('userStoryBeingGenerated/saveUserFinishedStory', async (body, { dispatch, getState }) => {
    try {
        const { userStoryBeingGenerated: story } = getState();
        const { storyId } = await sockets.emit<SaveFinishedUserStoryBody>(
            SocketNamespace.USER_STORIES,
            SocketEvent.SAVE_FINISHED_USER_STORY,
            {
                ...body,
                storyId: story.data.id!,
            }
        );
        return storyId;
    } catch (err) {
        handleOpenAIErrorOnStore(err, dispatch, 'error.userStoryBeingGenerated.save-finished-story');
    }
});

export const {
    resetUserStoryBeingGeneratedState,
    setUserUserStoryStoryChapterChoiceIsSelectedRes,
    removeUserStoryBeingGeneratedError,
    setUserStoryTopicsData,
    setUserStoryTopicsImages,
    setUserStoryChapterDataRes,
    setUserUserStoryChapterImageRes,
    setUserStoryChapterIsGenerated,
    setUserStoryIsDeleted,
} = userStoryBeingGeneratedSlice.actions;

export const userStoryBeingGeneratedReducer = userStoryBeingGeneratedSlice.reducer;
