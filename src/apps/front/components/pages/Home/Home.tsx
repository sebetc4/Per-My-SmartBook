import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import HeroImage from '../../../../../../public/images/illustrations/hero-home.png';
import { useAppSelector } from '~/apps/front/hooks';

export const Home = () => {
    const {layout} = useAppSelector(state => state.app)
    return (
        <Box sx={{ position: 'relative', width: '100vw', height: `calc(100vh - ${layout.headerHeight}px)` }}>
            <Image
                src={HeroImage}
                alt='Fille marchant dans une monde imaginaire'
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                quality={100}
                placeholder='blur'
            />
        </Box>
    );
};
