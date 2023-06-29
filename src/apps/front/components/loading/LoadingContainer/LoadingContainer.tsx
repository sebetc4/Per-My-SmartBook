import { CircularProgress, Container } from '@mui/material';
import React from 'react';
import { useAppSelector } from '~/apps/front/hooks';

export const LoadingContainer = () => {
    const { layout } = useAppSelector((state) => state.app);
    return (
        <Container
            sx={{
                width: '100%',
                height: `calc(100vh - ${layout.headerHeight}px - ${layout.footerHeight}px)`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color='secondary' />
        </Container>
    );
};
