import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react'

type MediaQuery = {
    upXs: boolean;
    upSm: boolean;
    upMd: boolean;
    upXmd: boolean;
    upLg: boolean;
    upXl: boolean;
};

const initialMediaQuery: MediaQuery = {
    upXs: false,
    upSm: false,
    upMd: false,
    upXmd: false,
    upLg: false,
    upXl: false,
};

export const useAppMediaQuery = () => {

    const theme = useTheme();
    const isUpXsScreen = useMediaQuery(theme.breakpoints.up('xs'));
    const isUpSmScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const isUpMdScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isUpXmdScreen = useMediaQuery(theme.breakpoints.up('xmd'));
    const isUpLgScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const isUpXlScreen = useMediaQuery(theme.breakpoints.up('xl'));

    const [mediaQuery, setMediaQuery] = useState<MediaQuery>(initialMediaQuery);

    useEffect(() => {
        setMediaQuery({
            upXs: isUpXsScreen,
            upSm: isUpSmScreen,
            upMd: isUpMdScreen,
            upXmd: isUpXmdScreen,
            upLg: isUpLgScreen,
            upXl: isUpXlScreen,
        });
    }, [isUpXsScreen, isUpSmScreen, isUpMdScreen, isUpXmdScreen, isUpLgScreen, isUpXlScreen]);

    return { mediaQuery};

}
