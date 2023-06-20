import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Path } from '../../../../../../../packages/types';

export const PageTitle = () => {
    // Hooks
    const { pathname } = useRouter();
    const { t } = useTranslation('header');

    // States
    const [pageTitle, setPageTitle] = useState('');

    // Effects
    useEffect(() => {
        switch (pathname) {
            case Path.HOME:
                setPageTitle(t('navigation.home'));
                break;
            case Path.SIGNIN:
                setPageTitle(t('navigation.signin'));
                break;
            case Path.SIGNUP:
                setPageTitle(t('navigation.signup'));
                break;
            case Path.USER_STORY_GENERATOR:
                setPageTitle(t('navigation.story-generator'));
                break;
            case Path.PUBLIC_STORIES:
                setPageTitle(t('navigation.bookstore'));
                break;
            case Path.SETTINGS:
                setPageTitle(t('navigation.settings'));
                break;
            case Path.USER_STORIES:
                setPageTitle(t('navigation.user-stories'));
                break;
            default:
                setPageTitle('');
        }
    }, [pathname, t]);
    return <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{pageTitle}</Typography>;
};
