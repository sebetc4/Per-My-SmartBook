import { CircularProgress, Container } from '@mui/material';
import React from 'react';
import { useAppSelector } from '~/apps/front/hooks';

export const LoadingContainer = () => {

    const {} = useAppSelector((state) => state.app)
    return (
        <Container
            sx={{ minHeight: `100vh`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <CircularProgress color='secondary'/>
        </Container>
    );
};
