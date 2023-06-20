//Lbraries
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';
// App
import BookNotFoundIllusrtarionSrc from '../../../../../../public/images/illustrations/book-not-found.png';

export const BookNotFoundIllustration = () => {
    const theme = useTheme();
    const { t: illustrationT } = useTranslation('illustrations');

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '500px',
                aspectRatio: '1 / 1',
                position: 'relative',
                borderRadius: '10px',
                overflox: 'hidden',
            }}
        >
            <Image
                src={BookNotFoundIllusrtarionSrc}
                alt='Book not found'
                fill
            />
            <Typography
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '19%',
                    Zindex: 10,
                    transform: 'translateX(-50%)',
                    color: theme.palette.secondary.light,
                    fontSize: { xxs: '1rem', xs: '1.2rem' },
                    fontWeight: '900',
                }}
            >
                {illustrationT('BookNotFoundIllustration.empty')}
            </Typography>
            <Typography
                textAlign={'center'}
                sx={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    display: 'block',
                    position: 'absolute',
                    p: 2,
                    width: '100%',
                    bottom: 0,
                    zIndex: 10,
                    color: theme.palette.secondary.light,
                    backgroundColor: '#844c2a',
                    borderRadius: 5,
                }}
            >
                {illustrationT('BookNotFoundIllustration.not-found')}
            </Typography>
        </Box>
    );
};
