import { CircularProgress, Container } from '@mui/material';
import React from 'react';

export const LoadingContainer = () => {
    return (
        <Container
            sx={{ minHeight: `calc(100vh - 201px)`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <CircularProgress color='secondary'/>
        </Container>
    );
};
