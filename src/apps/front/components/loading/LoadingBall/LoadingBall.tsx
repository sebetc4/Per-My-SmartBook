import React from 'react';
import styles from './LoadingBall.module.css';
import { Container, Typography } from '@mui/material';

export const LoadingBall = () => {
    return (
        <Container
            sx={{
                minHeight: `100vh`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 12,
                alignItems: 'center',
            }}
        >
            <Typography
                variant='logo'
                color='#3b5935'
                sx={{
                    fontWeight: 700,
                    letterSpacing: '0.3rem',
                    fontSize: { xxs: '3rem', sm: '9vw' },
                }}
            >
                My SmartBook
            </Typography>
            <div className={styles.pl}>
                <div className={styles.plOuterRing} />
                <div className={styles.plInnerRing} />
                <div className={styles.plTrackCover} />
                <div className={styles.plBall}>
                    <div className={styles.plBallTexture} />
                    <div className={styles.plBallOuterShadow} />
                    <div className={styles.plBallInnerShadow} />
                    <div className={styles.plBallSideShadows} />
                </div>
            </div>
        </Container>
    );
};
