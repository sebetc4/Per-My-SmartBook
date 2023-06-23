// Librairie 
import React, { ReactNode, useEffect, useRef } from 'react';
// MUI
import { Box, useTheme } from '@mui/material';
// App
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { logout, setAlert, } from '~/store';
import { SessionStatus } from '~/packages/types';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { AlertComponent } from '../Alert/Alert';
import { LoadingBall } from '../../loading/LoadingBall/LoadingBall';

type LayoutProps = {
    initializedApp: boolean;
    children: ReactNode;
};

export const Layout = ({ initializedApp, children }: LayoutProps) => {
    // Hooks
    const dispatch = useAppDispatch();
    const theme = useTheme()

    // Store
    const { sessionStatus } = useAppSelector((state) => state.auth);
    const { layout } = useAppSelector((state) => state.app);

    // Handle Invalid Session
    useEffect(() => {
        if (sessionStatus === SessionStatus.INVALID) {
            setAlert({ type: 'error', message: "Votre session n'est plus valide. Merci de vous reconnecter." });
            dispatch(logout());
        }
    });

    return initializedApp ? (
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
    ) : (
        <LoadingBall />
    );
};
