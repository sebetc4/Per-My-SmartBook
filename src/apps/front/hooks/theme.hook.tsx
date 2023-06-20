import { ReactNode, useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { commonTheme, darkPalette, darkTheme, lightPalette, lightTheme } from '../theme';
import { useAppSelector } from './redux.hook';
import { ColorMode } from '~/packages/types';

interface CustomThemeProvider {
    children: ReactNode;
}

export const CustomThemeProvider = ({ children }: CustomThemeProvider) => {
    // Store
    const { colorMode } = useAppSelector((state) => state.app);

    const theme = useMemo(
        () =>
            createTheme({
                ...commonTheme,
                ...(colorMode === ColorMode.LIGHT ? lightTheme : darkTheme),
                palette: {
                    mode: colorMode,
                    ...(colorMode === ColorMode.LIGHT ? lightPalette : darkPalette),
                },
            }),
        [colorMode]
    );

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
    );
};
