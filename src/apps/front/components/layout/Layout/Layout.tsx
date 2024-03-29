// Librairie
import React, { ReactNode, useEffect } from 'react';
// MUI
import { Box, useTheme } from '@mui/material';
// App
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { logout, setAlert } from '~/store';
import { SessionStatus } from '~/packages/types';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { AlertComponent } from '../Alert/Alert';
import { LoadingBall } from '../../loading/LoadingBall/LoadingBall';
import { LayoutContextProvider } from '~/apps/front/hooks/useLayout.hook';

type LayoutProps = {
    initializedApp: boolean;
    children: ReactNode;
};

export const Layout = ({ initializedApp, children }: LayoutProps) => {
    // Hooks
    const dispatch = useAppDispatch();
    const theme = useTheme();

    // Store
    const { sessionStatus } = useAppSelector((state) => state.auth);
    const { layout } = useAppSelector((state) => state.app);

    // Handle Invalid Session
    useEffect(() => {
        if (sessionStatus === SessionStatus.INVALID) {
            setAlert({ type: 'error', message: 'error.invalid-session' });
            dispatch(logout());
        }
    });

    return initializedApp ? (
        <LayoutContextProvider>
            <Box>
                {/* Header */}
                <Header />

                {/* Main */}
                <Box
                    component='main'
                    sx={{
                        width: '100%',
                        position: 'relative',
                        minHeight: `calc(100vh - ${layout.headerHeight + layout.footerHeight}px)`,
                        display: 'flex',
                        mt: `${layout.headerHeight}px`,
                        backgroundColor: theme.main.backgroundColor,
                        background: theme.main.background,
                        overflow: 'hidden',
                    }}
                >
                    {children}
                </Box>

                {/* Footer */}
                <Footer />

                {/* Alert */}
                <AlertComponent />
            </Box>
        </LayoutContextProvider>
    ) : (
        <LoadingBall />
    );
};
