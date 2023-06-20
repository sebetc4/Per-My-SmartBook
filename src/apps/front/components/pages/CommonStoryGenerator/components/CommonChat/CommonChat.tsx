// MUI
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '~/apps/front/hooks';

import { MessageList, SendMessageBar } from './Components';
// App

type CommonChatProps = {
    paddingBottom: number;
};

export const CommonChat = ({ paddingBottom }: CommonChatProps) => {
    // Hooks
    const theme = useTheme();

    // Store
    const { chat } = useAppSelector((state) => state.commonStoryBeingGenerated);
    const { layout } = useAppSelector((state) => state.app);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: `${layout.headerHeight}px`,
                left: 0,
                pb: `${paddingBottom}px`,
                pl: 2,
                pr: 2,
                display: 'flex',
                flexDirection: 'column',
                width: '400px',
                height: `calc(100vh - ${layout.headerHeight}px)`,
                backgroundColor: '#eae7e3',
                boxShadow:
                    'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
            }}
        >
            <Box sx={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {/* Title */}
                <Typography
                    textAlign={'center'}
                    variant='h3'
                    component='h2'
                    sx={{
                        mt: 2,
                        '::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: -3,
                            height: '2px',
                            width: '152px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: theme.palette.secondary.main,
                        },
                    }}
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
