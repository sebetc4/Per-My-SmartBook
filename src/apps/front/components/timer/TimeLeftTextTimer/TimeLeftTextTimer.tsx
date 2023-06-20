// Librairies
import { Box, SxProps, Typography, useTheme, } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { BeatLoader } from 'react-spinners';
// App
import { useTimeLeftTimer } from '../../../hooks';

type TimeLeftTextTimerProps = {
    text?: string;
    textSx?: SxProps;
    boxTextSX?: SxProps;
    endText?: string;
    endTextSx?: SxProps;
    withHours?: boolean;
    timeSx?: SxProps;
    endAt: number;
};

export const TimeLeftTextTimer = ({
    text,
    textSx,
    boxTextSX,
    endText,
    endTextSx,
    endAt,
    withHours,
    timeSx,
}: TimeLeftTextTimerProps) => {
    // Hooks
    const { timeLeft } = useTimeLeftTimer(endAt);
    const { t: timerT } = useTranslation('timer');
    const theme = useTheme();

    const timerIsOver = timeLeft.m === 0 && timeLeft.s === 0;

    return timeLeft.isInitialized ? (
        <>
            {endText && timerIsOver ? (
                <Typography color={theme.text.body} sx={endTextSx}>{endText}</Typography>
            ) : (
                <Box sx={boxTextSX}>
                    {text && <Typography  color={theme.text.body} sx={textSx}>{text}</Typography>}
                    {}
                    <Typography  color={theme.text.body} sx={timeSx}>
                        {`${withHours ? `${timeLeft.h} ${timerT('TimeLeftTextTimer.hours')} ` : ''}${
                            timeLeft.m
                        } ${timerT('TimeLeftTextTimer.minutes')} ${timeLeft.s} ${timerT('TimeLeftTextTimer.seconds')}`}
                    </Typography>
                </Box>
            )}
        </>
    ) : (
        <BeatLoader color={theme.palette.secondary.main}/>
    );
};
