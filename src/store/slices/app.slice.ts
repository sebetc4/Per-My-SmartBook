import { ColorMode } from '~/packages/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '~/services';
import { AxiosError } from 'axios';

type AppState = {
    isLoading: boolean;
    layout: {
        headerHeight: number;
        footerHeight: number;
    };
    colorMode: ColorMode;
    error: string | null;
};

const initialState: AppState = {
    isLoading: false,
    layout: {
        headerHeight: 0,
        footerHeight: 0,
    },
    colorMode: ColorMode.LIGHT,
    error: null
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHeaderHeight: (state, action: PayloadAction<number>) => {
            state.layout.headerHeight = action.payload;
        },
        setFooterHeight: (state, action: PayloadAction<number>) => {
            state.layout.footerHeight = action.payload;
        },
        setColorMode: (state, action: PayloadAction<ColorMode>) => {
            state.colorMode = action.payload;
        },
    },
    extraReducers: (builder) => {
        /**
         * Update account
         */
        builder.addCase(toggleColorMode.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(toggleColorMode.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.colorMode = state.colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT
        });
        builder.addCase(toggleColorMode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    }
});

export const toggleColorMode = createAsyncThunk<void, void, { rejectValue: string }>(
    'app/toggleColorMode',
    async (_, { rejectWithValue }) => {
        try {
            await api.toggleColorMode;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const { setHeaderHeight, setFooterHeight, setColorMode} = appSlice.actions;
export const appReducer = appSlice.reducer;
