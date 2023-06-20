import { useAppDispatch } from "~/apps/front/hooks";
import { sendCommonStoryChatMessage } from "~/store";
import { Box, IconButton, TextareaAutosize } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';

export const SendMessageBar = () => {
    // Hooks
    const dispatch = useAppDispatch();

    // State
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        dispatch(sendCommonStoryChatMessage(newMessage));
    };
    return (
        <Box
            component='form'
            sx={{ display: 'flex', gap: 2 }}
        >
            <TextareaAutosize
                id='chat-box-input'
                maxLength={300}
                maxRows={5}
                name='message'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onFocus={(e) =>
                    e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
                }
                placeholder='Votre message...'
                style={{
                    backgroundColor: 'transparent',
                    width: '100%',
                    color: 'black',
                    resize: 'none',
                    border: 'none',
                    padding: 8,
                    fontSize: '1rem',
                    borderRadius: 4,
                }}
            />
            <IconButton
                onClick={sendMessage}
                aria-label='Envoyer'
                disabled={newMessage === ''}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};
