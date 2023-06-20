import { Box, Fab, useTheme } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Path } from '../../../../../../../packages/types';
import { useAppMediaQuery } from '../../../../../hooks';

export const StartUserStoryButton = () => {
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();

    return mediaQuery.upMd ? (
        <Box
            sx={{
                position: 'relative',
                fontSize: '1.5rem',
                borderRadius: 5,
                transition: '0.5s',
                zIndex: 2,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    background: theme.palette.primary.main,
                    boxShadow: `4px 0px 29px 20px ${theme.palette.primary.main}`,
                    opacity: 0.7,
                    transform: 'scale(0)',
                    transition: '0.5s',
                    zIndex: 3,
                },
                '&:hover::before': {
                    transform: 'scale(1)',
                    transitionDelay: '0.5s',
                    zIndex: 2,
                },
                '& span': {
                    position: 'absolute',
                    background: theme.palette.primary.main,
                    pointerEvents: 'none',
                    borderRadius: '2px',
                    boxShadow: `0 0 10px #aaa79d, 0 0 20px #aaa79d, 0 0 30px #aaa79d, 0 0 50px #aaa79d, 0 0 100px #aaa79d`,
                    transition: '0.5s ease-in-out',
                    transitionDelay: '0.25s',
                    opacity: 0.5,
                },
                '&:hover span': {
                    opacity: 0,
                    transitionDelay: 0,
                },
                '& span:nth-child(1), & span:nth-child(3)': {
                    width: '40px',
                    height: '5px',
                },
                '& span:nth-child(2), & span:nth-child(4)': {
                    width: '5px',
                    height: '40px',
                },
                '&:hover span:nth-child(1), &:hover span:nth-child(3)': {
                    transform: 'translateY(0)',
                },
                '& span:nth-child(1)': {
                    top: 'calc(50% - 2px)',
                    left: '-50px',
                    transformOrigin: 'left',
                },
                '&:hover span:nth-child(1)': {
                    left: '50%',
                },
                '&:hover span:nth-child(3)': {
                    right: '50%',
                },
                '& span:nth-child(3)': {
                    top: 'calc(50% - 2px)',
                    right: '-50px',
                    transformOrigin: 'right',
                },
                '& span:nth-child(2)': {
                    left: 'calc(50% - 2px)',
                    top: '-50px',
                    transformOrigin: 'top',
                },
                '&:hover span:nth-child(2)': {
                    top: '50%',
                },
                '& span:nth-child(4)': {
                    left: 'calc(50% - 2px)',
                    bottom: '-50px',
                    transformOrigin: 'bottom',
                },
                '&:hover span:nth-child(4)': {
                    bottom: '50%',
                },
            }}
        >
            <Box component={'span'} />
            <Box component={'span'} />
            <Box component={'span'} />
            <Box component={'span'} />
            <StartButton />
        </Box>
    ) : (
        <StartButton />
    );
};

const StartButton = () => {
    const theme = useTheme();
    const {t: buttonT} = useTranslation('buttons') 

    return (
        <Fab
            component={Link}
            href={Path.USER_STORY_GENERATOR}
            variant='extended'
            sx={{
                p: { xxs: 1, md: 4 },
                position: 'relative',
                zIndex: 8,
                color: 'black',
                fontSize: { xxs: '1rem', md: '1.2rem' },
                textWeight: 'bold',
                transition: 'all ease-in 0.8s',
                '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                },
            }}
        >
            {buttonT('create-new-story')}
        </Fab>
    );
};
