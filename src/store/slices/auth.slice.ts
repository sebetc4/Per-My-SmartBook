import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '../../services';
import { CustomError } from '../../packages/classes';
import { LoginWithCredentialsBody, SessionStatus, SignUpBody } from '../../packages/types';
import { resetUserState, setUserSessionData } from './user.slice';
import { resetUserStoryBeingGeneratedState } from './userStoryBeingGenerated.slice';
import { resetUserStoriesState } from './userStories.slice';
import { setColorMode } from './app.slice';

type AuthState = {
    isLoading: boolean;
    isChecked: boolean;
    sessionStatus: SessionStatus | null;
    isAuth: boolean;
    error: string | null;
};

const initialState: AuthState = {
    isLoading: false,
    isChecked: false,
    sessionStatus: null,
    isAuth: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthIsChecked(state) {
            state.isChecked = true;
            state.error = null;
        },
        setUserIsAuth(state) {
            state.isChecked = true;
            state.sessionStatus = SessionStatus.VALID;
            state.isAuth = true;
            state.error = null;
        },
        setInvalidSession(state) {
            state.isChecked = true;
            state.isAuth = false;
            state.sessionStatus = SessionStatus.INVALID;
            state.error = CustomError.INVALID_TOKEN.message;
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.isChecked = true;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        /**
         * Sign up
         */
        builder.addCase(signUp.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signUp.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Login
         */
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isAuth = false;
            state.sessionStatus = null;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuth = true;
            state.sessionStatus = SessionStatus.VALID;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Logout
         */
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.sessionStatus = null;
            state.isAuth = false;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });

        /**
         * Check auth
         */
        builder.addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
            state.isChecked = false;
            state.sessionStatus = null;
            state.isAuth = false;
            state.error = null;
        });
        builder.addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isChecked = true;
            state.sessionStatus = action.payload ? SessionStatus.VALID : null;
            state.isAuth = action.payload;
        });
        builder.addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.error = action.payload || action.error.message || null;
        });
    },
});

export const signUp = createAsyncThunk<void, SignUpBody, { rejectValue: string }>(
    'auth/signUp',
    async (body, { rejectWithValue }) => {
        try {
            await api.signUp(body);
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const login = createAsyncThunk<void, LoginWithCredentialsBody, { rejectValue: string }>(
    'auth/loginWithCredentials',
    async (body, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await api.loginWithCredentials(body);
            const { colorMode, ...userSessionDara } = data.session.user;
            dispatch(setUserSessionData(userSessionDara));
            dispatch(setColorMode(colorMode));
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>('auth/logout', async (_, { dispatch }) => {
    await api.logout();
    dispatch(resetUserState());
    dispatch(resetUserStoriesState());
    dispatch(resetUserStoryBeingGeneratedState());
});

export const checkAuth = createAsyncThunk<boolean, void, { rejectValue: string }>(
    'auth/checkAuth',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await api.getSession();
            const { session } = data;
            if (!session) {
                return false;
            }
            if (session.status === SessionStatus.INVALID) {
                return false;
            }
            const { colorMode, ...userSessionDara } = session.user!;
            dispatch(setUserSessionData(userSessionDara));
            dispatch(setColorMode(colorMode));
            return true;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const { setAuthIsChecked, setUserIsAuth, setAuthError, setInvalidSession } = authSlice.actions;
export const authReducer = authSlice.reducer;
