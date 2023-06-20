import { useRouter } from 'next/router';
import { Button, Menu, MenuItem, SvgIcon, Tooltip, Typography } from '@mui/material';

import { useTranslation } from 'next-i18next';
import { MouseEvent, useMemo, useState } from 'react';
import { FrenchFlagSvg } from '../../../../svg/FrenchFlagSvg';
import { EnglishFlagSvg } from '../../../../svg/EnglishFlagSvg';

interface LanguageFlag {
    [key: string]: () => JSX.Element;
}

const languageFlag: LanguageFlag = {
    fr: FrenchFlagSvg,
    en: EnglishFlagSvg,
};

export const LocaleSwitcher = () => {
    // Hooks
    const router = useRouter();
    const { pathname, asPath, query, locales, locale } = router;
    const { t } = useTranslation('header');

    // State
    const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

    // Constants
    const otherLocales = useMemo(() => locales?.filter((l) => l !== locale), [locale, locales]);
    
    // Handlers
    const handleOpenLangMenu = (event: MouseEvent<HTMLElement>) => setAnchorElLang(event.currentTarget);
    const handleCloseLangMenu = () => setAnchorElLang(null);


    const changeLocale = (locale: string) => {
        router.push({ pathname, query }, asPath, { locale });
        handleCloseLangMenu();
    };

    return (
        <>
            <Tooltip title={t('language.tooltip')}>
                <Button
                    startIcon={<SvgIcon component={languageFlag[locale!]} />}
                    onClick={handleOpenLangMenu}
                    variant='text'
                    color='inherit'
                >
                    {locale}
                </Button>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElLang}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElLang)}
                onClose={handleCloseLangMenu}
            >
                {otherLocales?.map((locale) => (
                    <MenuItem
                        key={locale}
                        onClick={() => changeLocale(locale)}
                        sx={{display: 'flex', gap: 2}}
                    >
                        <SvgIcon component={languageFlag[locale!]} />
                        <Typography textAlign='center'>{locale}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};
