import { ChatMessage } from "~/packages/types";
import { Box, Divider, Typography } from "@mui/material";

type MessageContainerProps = {
    allMessages: ChatMessage[];
};

export const MessageList
 = ({ allMessages }: MessageContainerProps) => {
    return (
        <>
            {allMessages.length > 0 ? (
                <Box sx={{ mt: 2}}>
                    {allMessages.map((message, index) => (
                        <>
                            <Box
                                key={`message-${index}`}
                                sx={{
                                    position: 'relative',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: '-10px',
                                        height: '100%',
                                        width: '1px',
                                        backgroundColor: message.userColor,
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: message.userColor,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {message.username}
                                </Typography>
                                <Typography sx={{ ml: 1 }}>{message.message}</Typography>
                            </Box>
                            <Divider
                                sx={{ mt: 1, mb: 1 }}
                                flexItem
                            />
                        </>
                    ))}
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography>Aucun message</Typography>
                </Box>
            )}
        </>
    );
};

