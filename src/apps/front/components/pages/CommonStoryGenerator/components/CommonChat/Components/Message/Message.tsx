import { DateFromNow } from "~/apps/front/components/dates/FromNow/FromNow";
import { ChatMessage } from "~/packages/types";
import { Box, Typography } from "@mui/material";

type MessageProps = {
    message: ChatMessage;
};
export const Message = ({ message }: MessageProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Typography
                sx={{
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: message.userColor,
                }}
            >
                {message.username}
            </Typography>
            <Typography
                sx={{
                    fontSize: '0.8rem',
                    ml: 1,
                }}
            >
                {message.message}
            </Typography>
            <DateFromNow
                date={message.date}
                withoutUpdate
            />
        </Box>
    );
};
