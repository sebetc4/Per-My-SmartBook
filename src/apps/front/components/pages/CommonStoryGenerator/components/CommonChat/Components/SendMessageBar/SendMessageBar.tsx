// Librairies
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, IconButton, TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// App
import { useAppDispatch } from '~/apps/front/hooks';
import { sendCommonStoryChatMessage } from '~/store';

export const SendMessageBar = () => {
    // Hooks
    const dispatch = useAppDispatch();
    const { t: storyGeneratorT } = useTranslation('story-generator');

    // State
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage === '') return;
        dispatch(sendCommonStoryChatMessage(newMessage));
        setNewMessage('');
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
                placeholder={storyGeneratorT('CommonChat.placeholder.your-message')}
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
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        sendMessage();
                    }
                }}
            />
            <IconButton
                onClick={sendMessage}
                aria-label={storyGeneratorT('CommonChat.aria-label.send')}
                disabled={newMessage === ''}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};
