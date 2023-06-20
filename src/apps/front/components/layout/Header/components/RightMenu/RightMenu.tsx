// Librairies
import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
// MUI
import { IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
// App
import { useAppSelector } from '~/apps/front/hooks';
import { Path } from '~/packages/types';
import { CustomAvatar } from '~/apps/front/components/CustomAvatar/CustomAvatar';


type RightMenuProps = {
    handleLogout: () => void;
};

export const RightMenu = ({ handleLogout }: RightMenuProps) => {
    // Hooks
    const { t } = useTranslation('header');

    // Store
    const { session: user } = useAppSelector((state) => state.user);

    // State
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    // Constants
    const rightMenuItem = [
        {
            name: t('navigation.user-stories'),
            href: Path.USER_STORIES,
        },
        {
            name: t('navigation.settings'),
            href: Path.SETTINGS,
        },
    ];

    // Handlers
    const handleOpenRightMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
    const handleCloseRightMenu = () => setAnchorElUser(null);

    const handleClickOnLogout = () => {
        handleLogout();
        handleCloseRightMenu();
    };

    return (
        <>
            <Tooltip title={t('right-button.tooltip')}>
                <IconButton
                    onClick={handleOpenRightMenu}
                    sx={{ p: 0 }}
                >
                    <CustomAvatar
                        username={user!.username}
                        avatarUrl={user!.avatarUrl}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseRightMenu}
            >
                {rightMenuItem.map((item) => (
                    <MenuItem
                        key={item.name}
                        component={Link}
                        href={item.href}
                        onClick={handleCloseRightMenu}
                    >
                        <Typography textAlign='center'>{item.name}</Typography>
                    </MenuItem>
                ))}
                <MenuItem onClick={handleClickOnLogout}>
                    <Typography textAlign='center'>{t('navigation.logout')}</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};
