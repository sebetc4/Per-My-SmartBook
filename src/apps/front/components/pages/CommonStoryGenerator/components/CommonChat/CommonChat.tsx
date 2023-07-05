//Libraries
import { forwardRef, useCallback, useEffect, useState } from 'react';
//MUI
import { Box, Dialog, Divider, Fab, Slide, Typography, useTheme } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// App
import { MessageList, SendMessageBar } from './Components';
import { useAppMediaQuery, useAppSelector, useLayout } from '~/apps/front/hooks';
import { TransitionProps } from '@mui/material/transitions';
import { useTranslation } from 'react-i18next';

type CommonChatProps = {};

export const CommonChat = ({}: CommonChatProps) => {
    const { mediaQuery } = useAppMediaQuery();
    return mediaQuery.upMd ? <DesktopChat /> : <MobileChat />;
};

const DesktopChat = () => {
    // Hooks
    const { footerRef } = useLayout();
    const theme = useTheme()

    // Store
    const { layout } = useAppSelector((state) => state.app);

    // State
    const [chatBottom, setChatBottom] = useState(0);

    const calculFooterScrollPosition = useCallback(() => {
        const bottom = -((footerRef?.current?.getBoundingClientRect().top ?? 0) - window.innerHeight);
        setChatBottom(bottom > 0 ? bottom : 0);
    }, [footerRef]);

    useEffect(() => {
        calculFooterScrollPosition();
        addEventListener('scroll', calculFooterScrollPosition);
        return () => {
            window.removeEventListener('scroll', calculFooterScrollPosition);
        };
    }, [calculFooterScrollPosition]);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: `${layout.headerHeight}px`,
                bottom: `${chatBottom}px`,
                left: 0,
                pl: 2,
                pr: 2,
                display: 'flex',
                flexDirection: 'column',
                width: { md: '350px', lg: '400px' },
                backgroundColor: theme.chat.backgroundColor,
                boxShadow:
                    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                overflowX: 'scroll',
            }}
        >
            <Chat />
        </Box>
    );
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

const MobileChat = () => {
    // Store
    const { layout } = useAppSelector((state) => state.app);

    // State
    const [open, setOpen] = useState(false);

    return (
        <>
            <Fab
                color='primary'
                aria-label='open chat'
                onClick={() => setOpen(true)}
                sx={{
                    position: 'fixed',
                    top: '80px',
                    left: '20px',
                }}
            >
                <ChatIcon />
            </Fab>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullScreen
                TransitionComponent={Transition}
                transitionDuration={600}
            >
                <Box sx={{ position: 'relative', height: '100%', mt: `${layout.headerHeight}px` }}>
                    <Fab
                        color='primary'
                        aria-label='open chat'
                        onClick={() => setOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: '5px',
                            left: '20px',
                        }}
                    >
                        <ArrowBackIcon />
                    </Fab>
                    <Chat />
                </Box>
            </Dialog>
        </>
    );
};

const Chat = () => {
    // Hooks
    const {t: storyGeneratorT} = useTranslation('story-generator');
    const theme = useTheme()

    const { chat } = useAppSelector((state) => state.commonStoryBeingGenerated);

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Title */}
            <Typography
                textAlign={'center'}
                variant='h3'
                component='h2'
                sx={{ mt: 2 }}
                color={theme.text.title}
            >
                {storyGeneratorT('CommonChat.title')}
            </Typography>

            {/* Message list */}
            <Divider sx={{ my: 2 }} />
            <Box sx={{ flex: 1 }}>
                <MessageList allMessages={chat.allMessages} />
            </Box>

            {/* Message bar */}
            <Box>
                <Divider sx={{ my: 2 }} />
                <SendMessageBar />
                <Divider sx={{ my: 2 }} />
            </Box>
        </Box>
    );
};
