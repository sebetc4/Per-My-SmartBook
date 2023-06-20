// Librairies
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Container, Typography, useTheme } from '@mui/material';
// App
import { setFooterHeight, setFooterId } from '~/store';
import { useAppDispatch } from '~/apps/front/hooks';
interface IFooterProps {}

export const Footer = ({}: IFooterProps) => {
    // Hooks
    const footerRef = useRef<HTMLDivElement>(null);
    const { t: commonT } = useTranslation();
    const dispatch = useAppDispatch();
    const theme = useTheme();

    useEffect(() => {
        footerRef.current?.offsetHeight && dispatch(setFooterHeight(footerRef.current?.offsetHeight));
    }, [footerRef.current?.offsetHeight, dispatch]);

    useEffect(() => {
        if (footerRef.current) {
            const elementId = footerRef.current.id;
            dispatch(setFooterId(elementId));
        }
    }, [footerRef, dispatch]);

    return (
        <Box
            component='footer'
            ref={footerRef}
            id='footer'
            sx={{
                position: 'relative',
                borderTop: 1,
                borderColor: theme.footer.borderColor,
                backgroundColor: theme.footer.backgroundColor,
                zIndex: 1,
            }}
        >
            <Container
                maxWidth='xl'
                sx={{
                    pt: 6,
                    pb: 6,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography color={theme.text.subtitle}>{`${commonT('app-name')} -`}</Typography>
                    <Link
                        href='https://sebastien-etcheto.com'
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography
                            color='primary'
                            sx={{
                                fontWeight: 600,
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Sébastien ETCHETO
                        </Typography>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};
