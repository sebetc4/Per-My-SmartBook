// MUI
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useAppSelector, useLayout } from '~/apps/front/hooks';

import { MessageList, SendMessageBar } from './Components';
import { useCallback, useEffect, useState } from 'react';
// App

type CommonChatProps = {};

export const CommonChat = ({}: CommonChatProps) => {
    // Hooks
    const theme = useTheme();
    const { footerRef } = useLayout();

    // Store
    const { chat } = useAppSelector((state) => state.commonStoryBeingGenerated);
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
                width: '400px',
                backgroundColor: '#eae7e3',
                boxShadow:
                    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                overflowX: 'scroll',
            }}
        >
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Title */}
                <Typography
                    textAlign={'center'}
                    variant='h3'
                    component='h2'
                    sx={{ mt: 2 }}
                >
                    Chat
                </Typography>

                {/* Message list */}
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Box sx={{ flex: 1 }}>
                    <MessageList allMessages={chat.allMessages} />
                </Box>

                {/* Message bar */}
                <Box>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <SendMessageBar />
                    <Divider sx={{ mt: 2, mb: 2 }} />
                </Box>
            </Box>
        </Box>
    );
};
