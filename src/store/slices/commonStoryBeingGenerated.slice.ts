// Librairies
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// App
import { ChatMessage } from '../../packages/types';
import { sockets } from '../../services';
import { AppState } from '../store';
// Types
import {
    CommonStoryBeingGeneratedData,
    CommonStoryChapterDataRes,
    CommonStoryChapterImageRes,
    SelectCommonStoryStoryChapterChoiceBody,
    SocketEvent,
    SocketNamespace,
    FirstCommonStoryChapterRes,
    CommonStoryStoryChapterChoiceAndAllNumbOfVotesRes,
    SendCommonStoryChatMessageBody,
} from '../../packages/types';

type CommonStoryBeingGenerated = {
    isLoading: boolean;
    data: CommonStoryBeingGeneratedData | null;
    chat: {
        allMessages: ChatMessage[];
    };
    error: null | string;
};

const initialState: CommonStoryBeingGenerated = {
    isLoading: false,
    data: null,
    chat: {
        allMessages: [],
    },
    error: null,
};

export const commonStoryBeingGeneratedSlice = createSlice({
    name: 'commonStoryBeingGenerated',
    initialState,
    reducers: {
        /**
         * Story chapter Data
         */
        setFirstCommonStoryChapter(state, action: PayloadAction<FirstCommonStoryChapterRes>) {
            state.data!.state = 'generating';
            state.data!.currentStep = 1;
            state.data!.allChapters = [action.payload.chapter];
        },
        setCommonStoryChapterData(state, action: PayloadAction<CommonStoryChapterDataRes>) {
            const { chapterIndex, chapter, isEnd } = action.payload;
            state.data!.state = isEnd ? 'finished' : 'generating';
            state.data!.currentStep = chapterIndex + 1;
            state.data!.allChapters[chapterIndex] = chapter;
        },
        /**
         * Story chapter Image
         */
        setCommonUserStoryChapterImageRes(state, action: PayloadAction<CommonStoryChapterImageRes>) {
            const { chapterIndex, imageUrl } = action.payload;
            state.data!.allChapters[chapterIndex].image = { url: imageUrl };
        },
        /**
         * Story chapter choice and all numbs of votes
         */
        setCommonStoryChapterChoiceAndAllNumbOfVotes(
            state,
            action: PayloadAction<CommonStoryStoryChapterChoiceAndAllNumbOfVotesRes>
        ) {
            const { selectedChoiceIndex, allNumbOfVotes } = action.payload;
            allNumbOfVotes.forEach((numbOfVotes, index) => {
                state.data!.allChapters.at(-1)!.allChoices![index].numbOfVotes = numbOfVotes;
            });
            state.data!.allChapters.at(-1)!.selectedChoiceIndex = selectedChoiceIndex;
        },
        /**
         * Stopped Story
         */
        setCommonStoryIsStopped(state) {
            state.data!.state = 'stopped';
        },
        /**
         * Finished Story
         */
        setCommonStoryIsFinished(state) {
            state.data!.state = 'finished';
        },
        /**
         * New chat message
         */
        addNewChatMessage(state, action: PayloadAction<ChatMessage>) {
            state.chat.allMessages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        /**
         * Get common story being generated data
         */
        builder.addCase(getCommonStoryBeingGeneratedData.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getCommonStoryBeingGeneratedData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(getCommonStoryBeingGeneratedData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });

        /**
         * Select Story Chapter Choice
         */
        builder.addCase(selectCommonStoryStoryChapterChoice.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(selectCommonStoryStoryChapterChoice.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(selectCommonStoryStoryChapterChoice.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });

        /**
         * Send message
         */
        builder.addCase(sendCommonStoryChatMessage.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(sendCommonStoryChatMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chat.allMessages = [...state.chat.allMessages, action.payload];
        });
        builder.addCase(sendCommonStoryChatMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    },
});

export const getCommonStoryBeingGeneratedData = createAsyncThunk<CommonStoryBeingGeneratedData, string>(
    'commonStoryBeingGenerated/getCommonStoryBeingGenerated',
    async (storyId) => {
        try {
            const { story } = await sockets.emit(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.GET_COMMON_STORY_BEINGGENERATED_DATA,
                { storyId }
            );
            return story;
        } catch (err) {}
    }
);

export const selectCommonStoryStoryChapterChoice = createAsyncThunk<void, number, { state: AppState }>(
    'commonStoryBeingGenerated/selectCommonStoryStoryChapterChoice',
    async (selectedChoiceIndex, { getState }) => {
        try {
            const { commonStoryBeingGenerated: story } = getState();
            await sockets.emit<SelectCommonStoryStoryChapterChoiceBody>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.SELECT_COMMON_STORY_CHAPTER_CHOICE,
                {
                    storyId: story.data!.id!,
                    selectedChoiceIndex,
                }
            );
        } catch (err) {}
    }
);

export const sendCommonStoryChatMessage = createAsyncThunk<ChatMessage, string, { state: AppState }>(
    'commonStoryBeingGenerated/sendCommonStoryChatMessage',
    async (message, { getState }) => {
        try {
            const { commonStoryBeingGenerated: story } = getState();
            const newMessage = await sockets.emit<SendCommonStoryChatMessageBody>(
                SocketNamespace.COMMON_STORIES,
                SocketEvent.SEND_CHAT_MESSAGE,
                {
                    storyId: story.data!.id!,
                    message,
                }
            );
            return newMessage
        } catch (err) {}
    }
);

export const {
    setFirstCommonStoryChapter,
    setCommonStoryChapterData,
    setCommonStoryChapterChoiceAndAllNumbOfVotes,
    setCommonUserStoryChapterImageRes,
    setCommonStoryIsStopped,
    setCommonStoryIsFinished,
} = commonStoryBeingGeneratedSlice.actions;

export const commonStoryBeingGeneratedReducer = commonStoryBeingGeneratedSlice.reducer;
