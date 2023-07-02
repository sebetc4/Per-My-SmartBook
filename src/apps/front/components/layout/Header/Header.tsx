// Librairies
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
// MUI
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography, Container, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
// App
import { useAppDispatch, useAppMediaQuery, useAppSelector } from '~/apps/front/hooks';
import { logout, setHeaderHeight } from '~/store';
import { Path } from '~/packages/types';
import { BurgerButton, LocaleSwitcher, NavMenu, Navbar, PageTitle, RightMenu } from './components';

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    // Hooks
    const headerRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { t: headerT } = useTranslation('header');
    const { t: commonT } = useTranslation();
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();

    // Store
    const { isAuth } = useAppSelector((state) => state.auth);
    const { session: user } = useAppSelector((state) => state.user);

    // State
    const [openNavModal, setOpenNavModal] = useState(false);

    // Set height header on the store
    useEffect(() => {
        headerRef.current?.offsetHeight && dispatch(setHeaderHeight(headerRef.current?.offsetHeight));
    }, [mediaQuery.upSm, headerRef.current?.offsetHeight, dispatch]);

    // Close NavBar on resize
    useEffect(() => {
        mediaQuery.upMd && setOpenNavModal(false);
    }, [mediaQuery.upMd]);

    // Handlers
    const handleCloseNavMenu = () => setOpenNavModal(false);
    const toggleOpenNavModal = () => setOpenNavModal((prev) => !prev);

    const handleLogout = async () => {
        await dispatch(logout());
        router.replace(Path.HOME);
    };

    return (
        <>
            <AppBar
                position='fixed'
                ref={headerRef}
                sx={{ background: theme.header.backgroundColor, zIndex: 1600 }}
            >
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Grid container>
                            {/* Left block */}
                            <Grid
                                item
                                xxs={2}
                                xs={3}
                                md={5}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {/* Mobile */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: { xxs: 'block', md: 'none' },
                                    }}
                                >
                                    <BurgerButton
                                        open={openNavModal}
                                        onClick={toggleOpenNavModal}
                                    />
                                </Box>

                                {/* Desktop */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: { xxs: 'none', md: 'block' },
                                    }}
                                >
                                    <Link
                                        href='/'
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                    >
                                        <Typography
                                            variant='logo'
                                            noWrap
                                            color='inherit'
                                            sx={{
                                                mr: 4,
                                                ml: 1,
                                                p: 0.5,
                                                color: theme.header.icon.main,
                                                fontWeight: 700,
                                                letterSpacing: '0.3rem',
                                                textShadow: '#000 3px 2px',
                                                textDecoration: 'none',
                                                fontSize: '2.7rem',
                                                transition: 'all 0.3s ease',
                                                ':hover': {
                                                    color: theme.header.icon.selected,
                                                    transform: 'scale(1.1)',
                                                },
                                            }}
                                        >
                                            {commonT('app-name')}
                                        </Typography>
                                    </Link>
                                </Box>
                            </Grid>

                            {/* Middle Block */}
                            <Grid
                                item
                                xxs={10}
                                xs={6}
                                md={3}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {/* Mobile */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: { xxs: 'flex', md: 'none' },
                                        justifyContent: 'center',
                                    }}
                                >
                                    <PageTitle />
                                </Box>
                                {/* Desktop */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: { xxs: 'none', md: 'flex' },
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Navbar />
                                </Box>
                            </Grid>

                            {/* Right Block */}
                            <Grid
                                item
                                xxs={0}
                                xs={3}
                                md={4}
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}
                            >
                                {/* Mobile */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: { xxs: 'none', xs: 'flex', md: 'none' },
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    {!isAuth && (
                                        <Button
                                            variant='outlined'
                                            color='inherit'
                                            onClick={() => router.push(Path.SIGNIN)}
                                        >
                                            {headerT('navigation.signin')}
                                        </Button>
                                    )}
                                </Box>

                                {/* Desktop */}
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: { xxs: 'none', md: 'flex' },
                                        justifyContent: 'flex-end',
                                        gap: 4,
                                    }}
                                >
                                    <Box sx={{ display: { xxs: 'none', lg: 'block' } }}>
                                        <LocaleSwitcher />
                                    </Box>
                                    {isAuth && user ? (
                                        <RightMenu handleLogout={handleLogout} />
                                    ) : (
                                        <Box>
                                            <Button
                                                sx={{ mr: 4 }}
                                                color='inherit'
                                                onClick={() => router.push(Path.SIGNUP)}
                                            >
                                                {headerT('navigation.signup')}
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                color='inherit'
                                                onClick={() => router.push(Path.SIGNIN)}
                                            >
                                                {headerT('navigation.signin')}
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <NavMenu
                open={openNavModal}
                handleClose={handleCloseNavMenu}
                handleLogout={handleLogout}
            />
        </>
    );
};
