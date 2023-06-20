import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
    AddModifyOpenaiKeyReq,
    UpdateAccountReq,
    UpdateAISettingsReq,
    UpdatePasswordReq,
    UserSessionData,
    UserSettings,
} from '../../packages/types';
import { api } from '../../services';

type UserState = {
    isLoading: boolean;
    session: UserSessionData | null;
    settings: UserSettings | null;
    error: string | null;
};

const initialState: UserState = {
    isLoading: false,
    session: null,
    settings: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState(state) {
            state.isLoading = initialState.isLoading;
            state.session = initialState.session;
            state.settings = initialState.settings;
            state.error = initialState.error;
        },
        setUserSessionData(state, action: PayloadAction<UserSessionData>) {
            state.session = action.payload;
        },
        setUserSettings(state, action: PayloadAction<UserSettings>) {
            state.settings = action.payload;
        },
        /*
        /   Color
        */
        setUserColor(state, action: PayloadAction<string>) {
            state.session!.userColor = action.payload;
        },
    },
    extraReducers: (builder) => {
        /**
         * Update account
         */
        builder.addCase(updateAccount.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateAccount.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.session = action.payload;
        });
        builder.addCase(updateAccount.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Update profile
         */
        builder.addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.session = action.payload;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Update password
         */
        builder.addCase(updatePassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Update AI settings
         */
        builder.addCase(updateAISettings.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateAISettings.fulfilled, (state, action) => {
            state.isLoading = false;
            (state.settings!.ai = {
                openai: {
                    ...action.payload,
                    key: state.settings?.ai.openai.key || null,
                },
            }),
                (state.error = null);
        });
        builder.addCase(updateAISettings.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Add OpenAI key
         */
        builder.addCase(addModifyOpenaiKey.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addModifyOpenaiKey.fulfilled, (state, action) => {
            state.isLoading = false;
            state.settings!.ai.openai.key = action.payload;
            state.error = null;
        });
        builder.addCase(addModifyOpenaiKey.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Delete OpenAI key
         */
        builder.addCase(deleteOpenaiKey.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteOpenaiKey.fulfilled, (state) => {
            state.isLoading = false;
            state.settings!.ai.openai.key = null;
            state.error = null;
        });
        builder.addCase(deleteOpenaiKey.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const updateAccount = createAsyncThunk<any, UpdateAccountReq, { rejectValue: string }>(
    'user/updateAccount',
    async (body, { rejectWithValue }) => {
        try {
            const res = await api.updateAccount(body);
            return res.data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const updateProfile = createAsyncThunk<any, FormData, { rejectValue: string }>(
    'user/updateProfile',
    async (body, { rejectWithValue }) => {
        try {
            const res = await api.updateProfile(body);
            return res.data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const updatePassword = createAsyncThunk<any, UpdatePasswordReq, { rejectValue: string }>(
    'user/updatePassword',
    async (body, { rejectWithValue }) => {
        try {
            const res = await api.updatePassword(body);
            return res.data.session;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const updateAISettings = createAsyncThunk<UpdateAISettingsReq, UpdateAISettingsReq, { rejectValue: string }>(
    'user/updateAISettings',
    async (body, { rejectWithValue }) => {
        try {
            await api.updateAISettings(body);
            return body;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const addModifyOpenaiKey = createAsyncThunk<string, AddModifyOpenaiKeyReq, { rejectValue: string }>(
    'user/addModifyOpenaiKey',
    async (body, { rejectWithValue }) => {
        try {
            const { data } = await api.addModifyOpenaiKey(body);
            return data.key;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const deleteOpenaiKey = createAsyncThunk<void, void, { rejectValue: string }>(
    'user/deleteOpenaiKey',
    async (_, { rejectWithValue }) => {
        try {
            await api.deleteOpenaiKey();
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const { resetUserState, setUserSessionData, setUserSettings, setUserColor } = userSlice.actions;
export const userReducer = userSlice.reducer;
