// Librairies
import { useState, FC, useMemo, useEffect, useRef, forwardRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
import { Swiper as ISwiper } from 'swiper/types';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
// MUI
import { Typography, Container, Tabs, Tab, Box, SvgIcon, useTheme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import MonitorIcon from '@mui/icons-material/Monitor';
// App
import { setUrlWithoutReload } from '~/apps/front/utils';
import { AISettings, AccountSettings, AppearanceSettings, PasswordSettings, ProfileSettings } from './components';
import { useAppMediaQuery } from '~/apps/front/hooks';
import { useAppSelector } from '~/apps/front/hooks/redux.hook';
import { LoadingContainer } from '../..';
import { Path } from '~/packages/types';


type TabType = {
    name: 'general' | 'profile' | 'connection' | 'ai' | 'appearance';
    label: string;
    icon: SvgIconComponent;
    component: FC;
};

export const Settings = () => {
    // Hooks
    const router = useRouter();
    const leftMenuRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    // Store
    const { session: user, settings } = useAppSelector((state) => state.user);
    const { t: settingsT } = useTranslation('settings');
    const { mediaQuery } = useAppMediaQuery();

    // Constants
    const allTabs: TabType[] = useMemo(
        () => [
            {
                name: 'general',
                label: settingsT('tabs.general.label'),
                icon: SettingsOutlinedIcon,
                component: AccountSettings,
            },
            {
                name: 'profile',
                label: settingsT('tabs.profile.label'),
                icon: Person2OutlinedIcon,
                component: ProfileSettings,
            },
            {
                name: 'appearance',
                label: settingsT('tabs.profile.appearance'),
                icon: MonitorIcon,
                component: AppearanceSettings,
            },
            {
                name: 'connection',
                label: settingsT('tabs.connection.label'),
                icon: VpnKeyOutlinedIcon,
                component: PasswordSettings,
            },
            {
                name: 'ai',
                label: settingsT('tabs.ai.label'),
                icon: PsychologyOutlinedIcon,
                component: AISettings,
            },
        ],
        [settingsT]
    );

    const tabs: TabType[] = useMemo(
        () => (user?.authProvider === 'credentials' ? allTabs : allTabs.filter((tab) => tab.name !== 'connection')),
        [user?.authProvider, allTabs]
    );

    const initialTab = () => {
        const indexTab = tabs.findIndex((tab) => tab.name === router.query.tab);
        return indexTab === -1 ? 0 : indexTab;
    };

    // State
    const [swiper, setSwiper] = useState<ISwiper | null>(null);
    const [currentTab, setCurrentTab] = useState<number>(initialTab());
    const [leftMenuWidth, setLeftMenuWidth] = useState<number>(0);

    // Handlers
    const handleChangeCurrentTab = (e: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
        setUrlWithoutReload(`${Path.SETTINGS}?tab=${tabs[newValue].name}`);
    };

    useEffect(() => {
        swiper?.slideTo(currentTab, 500);
    }, [currentTab, swiper]);

    useEffect(() => {
        const setLeftfMenuSize = () => {
            setLeftMenuWidth(leftMenuRef.current?.offsetWidth || 0);
        };
        addEventListener('resize', setLeftfMenuSize);
        return () => {
            window.removeEventListener('resize', setLeftfMenuSize);
        };
    }, []);

    return settings ? (
        <>
            {mediaQuery.upMd && (
                <LeftMenu
                    ref={leftMenuRef}
                    tabs={tabs}
                    currentTab={currentTab}
                    handleChangeCurrentTab={handleChangeCurrentTab}
                />
            )}

            <Container maxWidth='lg'>
                <TopMenu
                    tabs={tabs}
                    currentTab={currentTab}
                    handleChangeCurrentTab={handleChangeCurrentTab}
                />
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        minHeight: '500px',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        ml: `${leftMenuWidth || 0}px`,
                        pt: theme.main.padding,
                        pb: theme.main.padding,
                    }}
                >
                    <Swiper
                        onSwiper={setSwiper}
                        direction={mediaQuery.upMd ? 'vertical' : 'horizontal'}
                        allowTouchMove={false}
                        initialSlide={currentTab}
                        style={{
                            position: 'absolute',
                            inset: 0,
                        }}
                    >
                        {tabs.map((tab, i) => (
                            <SwiperSlide
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    height: '100%',
                                }}
                                key={`slide-${i}`}
                            >
                                <Box
                                    hidden={currentTab !== i}
                                    id={`tabpanel-${i}`}
                                    aria-labelledby={`tab-${i}`}
                                    sx={{
                                        display: 'flex',
                                        height: '100%',
                                        alignItems: 'center',
                                    }}
                                >
                                    <tab.component />
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </Box>
            </Container>
        </>
    ) : (
        <LoadingContainer />
    );
};

type LeftMenuProps = {
    tabs: TabType[];
    currentTab: number;
    handleChangeCurrentTab: (e: React.SyntheticEvent, newValue: number) => void;
};

const LeftMenu = forwardRef((props: LeftMenuProps, ref) => {
    const theme = useTheme()
    const { tabs, currentTab, handleChangeCurrentTab } = props;
    const { t: settingsT } = useTranslation('settings');

    return (
        <Box
            ref={ref}
            sx={{
                display: { xxs: 'none', md: 'block' },
                position: 'absolute',
                pt: 6,
                left: 0,
                top: 0,
                bottom: 0,
                borderRight: 1,
                borderColor: 'divider',
            }}
        >
            <Typography
                component='h1'
                color={theme.text.title}
                variant='h5'
                sx={{ ml: 2 }}
                textTransform='uppercase'
            >
                {settingsT('settings-title.h1')}
            </Typography>
            <Tabs
                orientation='vertical'
                centered
                value={currentTab}
                onChange={handleChangeCurrentTab}
                aria-label='settings tab'
                sx={{ width: '100%', mt: 4 }}
            >
                {tabs.map((tab, i) => (
                    <Tab
                        icon={
                            <SvgIcon
                                component={tab.icon}
                                sx={{ mr: 2 }}
                            />
                        }
                        key={i}
                        label={tab.label}
                        id={`tab-${i}`}
                        iconPosition='start'
                        sx={{
                            pr: 8,
                            justifyContent: 'flex-start',
                        }}
                        aria-controls={`tabpanel-${i}`}
                    />
                ))}
            </Tabs>
        </Box>
    );
});

const TopMenu = ({ tabs, currentTab, handleChangeCurrentTab }: LeftMenuProps) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: { xxs: 'block', md: 'none' },
            }}
        >
            <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    sx={{ width: '100%' }}
                    value={currentTab}
                    onChange={handleChangeCurrentTab}
                    centered
                    aria-label='basic tabs example'
                >
                    {tabs.map((tab, i) => (
                        <Tab
                            icon={
                                <SvgIcon
                                    component={tab.icon}
                                    sx={{ mr: 2 }}
                                />
                            }
                            key={i}
                            label={tab.label}
                            id={`tab-${i}`}
                            iconPosition='start'
                            aria-controls={`tabpanel-${i}`}
                        />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
};
