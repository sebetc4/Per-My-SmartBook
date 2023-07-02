// https://stackoverflow.com/questions/54375096/styling-bottomnavigation-in-react-js-material-ui
//Libraries
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { IconType } from 'react-icons';
//MUI
import { BottomNavigation, BottomNavigationAction, SvgIcon, useTheme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
//aPP
import { Path } from '~/packages/types';

type NavbarItem = {
    icon: SvgIconComponent | IconType;
    label: string;
    href: string;
};

export const Navbar = () => {
    // Hooks
    const router = useRouter();
    const { t: headerT } = useTranslation('header');
    const theme = useTheme();

    // Constants
    const allNavbarItems: NavbarItem[] = useMemo(
        () => [
            {
                icon: HomeOutlinedIcon,
                label: headerT('navigation.home'),
                href: Path.HOME,
            },
            {
                icon: MenuBookIcon,
                label: headerT('navigation.new-story'),
                href: Path.NEW_STORY,
            },
            {
                icon: LibraryBooksOutlinedIcon,
                label: headerT('navigation.bookstore'),
                href: Path.PUBLIC_STORIES,
            },
        ],
        [headerT]
    );

    return (
        <BottomNavigation
            component={'nav'}
            value={router.pathname}
            sx={{
                color: 'red',
                backgroundColor: 'transparent',
                fontSize: '2rem',
            }}
        >
            {allNavbarItems.map((item) => (
                <BottomNavigationAction
                    key={`navbar-item-${item.label}`}
                    component={Link}
                    href={item.href}
                    label={item.label}
                    icon={
                        <SvgIcon
                            component={item.icon}
                            sx={{ fontSize: '40px' }}
                        />
                    }
                    sx={{
                        color: theme.header.icon.main,
                        '&.Mui-selected': {
                            color: theme.header.icon.selected,
                            textShadow: '#000 3px 2px',
                        },
                    }}
                    value={item.href}
                />
            ))}
        </BottomNavigation>
    );
};
