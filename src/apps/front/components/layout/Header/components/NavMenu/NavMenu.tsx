// Librairie
import { forwardRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
// MUI
import { SvgIconComponent } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    Divider,
    List,
    ListItemAvatar,
    ListItemButton,
    Slide,
    SvgIcon,
    Typography,
    useTheme,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// App
import { Path } from '~/packages/types';
import { useAppSelector } from '~/apps/front/hooks';

type NavMenuItem = {
    icon: SvgIconComponent;
    label: string;
    href: Path;
};

type NavMenuProps = {
    open: boolean;
    handleClose: () => void;
    handleLogout: () => void;
};

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return (
        <Slide
            direction='right'
            ref={ref}
            {...props}
        />
    );
});

export const NavMenu = ({ open, handleClose, handleLogout }: NavMenuProps) => {
    // Hooks
    const { t } = useTranslation('header');
    const { t: commonT } = useTranslation();
    const theme = useTheme();
    const router = useRouter();

    // Store
    const { layout } = useAppSelector((state) => state.app);
    const { isAuth } = useAppSelector((state) => state.auth);

    // Handlers
    const handleNavigation = (href: Path) => {
        handleClose();
        router.push(href);
    };

    const handleLogoutClick = () => {
        handleClose();
        handleLogout();
    }

    // Constants
    const allNavMenuItems: NavMenuItem[] = useMemo(
        () => [
            {
                icon: HomeOutlinedIcon,
                label: t('navigation.home'),
                href: Path.HOME,
            },
            {
                icon: MenuBookOutlinedIcon,
                label: t('navigation.bookstore'),
                href: Path.PUBLIC_STORIES,
            },
            {
                icon: LocalLibraryIcon,
                label: t('navigation.user-stories'),
                href: Path.USER_STORIES,
            },
            {
                icon: SettingsOutlinedIcon,
                label: t('navigation.settings'),
                href: Path.SETTINGS,
            },
        ],
        [t]
    );

    const navMenuItems = allNavMenuItems.filter(
        (item) => !(!isAuth && item.href !== Path.HOME && item.href !== Path.PUBLIC_STORIES)
    );

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen
            TransitionComponent={Transition}
            transitionDuration={600}
            PaperProps={{
                sx: {
                    position: 'fixed',
                    width: { xxs: '66%', sm: '50%' },
                    left: 0,
                },
            }}
            sx={{ zIndex: 1000 }}
        >
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ mt: `${layout.headerHeight}px`, p: 2 }}>
                    <Typography
                        variant='logo'
                        textAlign='center'
                        sx={{
                            display: 'block',
                            ml: 'auto',
                            mr: 'auto',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            textDecoration: 'none',
                            fontSize: { xxs: '1.6rem', xs: '2rem' },
                        }}
                    >
                        {commonT('app-name')}
                    </Typography>
                    <Divider
                        sx={{
                            mt: 1,
                            height: 2,
                        }}
                    />
                </Box>
                <List
                    sx={{
                        width: '100%',
                        flex: 1,
                        maxWidth: 360,
                        bgcolor: 'background.button',
                    }}
                >
                    {navMenuItems.map((item) => (
                        <Box key={`nav-menu-item-${item.label}`}>
                            <ListItemButton
                                onClick={() => handleNavigation(item.href)}
                                sx={{ pt: 2, pb: 2 }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                        <SvgIcon component={item.icon} />
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography sx={{ fontSize: '1.3rem' }}>{item.label}</Typography>
                            </ListItemButton>
                            <Divider
                                variant='inset'
                                component='li'
                            />
                        </Box>
                    ))}
                </List>
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, pb: 4, gap: 2 }}>
                    {isAuth ? (
                        <Button
                            variant='contained'
                            size='large'
                            onClick={handleLogoutClick}
                            fullWidth
                        >
                            {t('navigation.logout')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                sx={{ mr: 4 }}
                                size='large'
                                variant='outlined'
                                onClick={() => handleNavigation(Path.SIGNUP)}
                                fullWidth
                            >
                                {t('navigation.signup')}
                            </Button>
                            <Button
                                variant='contained'
                                size='large'
                                onClick={() => handleNavigation(Path.SIGNIN)}
                                fullWidth
                            >
                                {t('navigation.signin')}
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </Dialog>
    );
};
