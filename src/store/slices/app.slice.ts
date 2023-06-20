import { ColorMode } from '~/packages/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
    layout: {
        headerHeight: number;
        footerHeight: number;
        footerId: string | null;
        pageHeight: number;
    };
    colorMode: ColorMode;
};

const initialState: AppState = {
    layout: {
        headerHeight: 0,
        footerHeight: 0,
        footerId: null,
        pageHeight: 0
    },
    colorMode: ColorMode.LIGHT,
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
        setFooterId: (state, action: PayloadAction<string | null>) => {
            state.layout.footerId = action.payload;
        },
        setColorMode: (state, action: PayloadAction<ColorMode>) => {
            state.colorMode = action.payload;
        },
        toggleColorMode: (state) => {
            state.colorMode = state.colorMode === ColorMode.LIGHT ? ColorMode.DARK : ColorMode.LIGHT
        }
    },
});

export const { setHeaderHeight, setFooterHeight, setFooterId, setColorMode, toggleColorMode} = appSlice.actions;
export const appReducer = appSlice.reducer;
