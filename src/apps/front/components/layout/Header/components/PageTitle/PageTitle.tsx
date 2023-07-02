import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Path } from '../../../../../../../packages/types';

export const PageTitle = () => {
    // Hooks
    const { pathname } = useRouter();
    const { t: headerT } = useTranslation('header');

    // States
    const [pageTitle, setPageTitle] = useState('');

    // Effects
    useEffect(() => {
        switch (pathname) {
            case Path.HOME:
                setPageTitle(headerT('navigation.home'));
                break;
            case Path.SIGNIN:
                setPageTitle(headerT('navigation.signin'));
                break;
            case Path.SIGNUP:
                setPageTitle(headerT('navigation.signup'));
                break;
            case Path.USER_STORY_GENERATOR:
                setPageTitle(headerT('navigation.user-story-generator'));
                break;
            case Path.PUBLIC_STORIES:
                setPageTitle(headerT('navigation.bookstore'));
                break;
            case Path.SETTINGS:
                setPageTitle(headerT('navigation.settings'));
                break;
            case Path.USER_STORIES:
                setPageTitle(headerT('navigation.user-stories'));
                break;
            case Path.NEW_STORY:
                setPageTitle(headerT('navigation.new-story'));
                break;
            case Path.COMMON_STORY_GENERATOR:
                setPageTitle(headerT('navigation.common-story-generator'));

            default:
                setPageTitle('');
        }
    }, [pathname, headerT]);
    return <Typography sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{pageTitle}</Typography>;
};
