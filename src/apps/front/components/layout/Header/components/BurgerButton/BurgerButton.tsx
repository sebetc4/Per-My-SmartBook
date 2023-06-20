import { Box, BoxProps, IconButton, styled } from '@mui/material';
import React from 'react';

const burgerBarWidth = 30;
const burgerBarHeight = 4;
const spaceBetweenBurgerBar = 11;

const Burger = styled(Box)<BoxProps>(({ theme }) => ({
    transitionDuration: '0.5s',
    position: 'absolute',
    height: `${burgerBarHeight}px`,
    width: `${burgerBarWidth}px`,
    top: `21px`,
    backgroundColor: 'white',
    borderRadius: `10px`,
    '&:before, &:after': {
        transitionDuration: '0.5s',
        position: 'absolute',
        width: `${burgerBarWidth}px`,
        left: '0',
        height: `${burgerBarHeight}px`,
        backgroundColor: 'white',
        borderRadius: `10px`,
        content: '""',
    },
    '&:before': {
        top: `-${spaceBetweenBurgerBar}px`,
    },
    '&:after': {
        top: `${spaceBetweenBurgerBar}px`,
    },
    '&.open': {
        transitionDuration: '0.5s',
        transform: 'rotateZ(180deg)',
        '&:before': {
            transform: 'rotateZ(45deg) scaleX(0.75) translate(13px, -4px)',
        },
        '&:after': {
            transform: 'rotateZ(-45deg) scaleX(0.75) translate(13px, 4px)',
        },
    },
    '&:hover': {
        cursor: 'pointer',
    },
}));

interface BurgerButtonProps {
    open: boolean;
    onClick: () => void;
}

export const BurgerButton = ({ open, onClick }: BurgerButtonProps) => {
    return (
        <IconButton
            onClick={onClick}
            sx={{ position: 'relative' }}
        >
            <Box
                sx={{
                    width: `${burgerBarWidth}px`,
                    height: `${burgerBarWidth}px`,
                }}
            >
                <Burger className={`${open ? 'open' : ''}`} />
            </Box>
        </IconButton>
    );
};
