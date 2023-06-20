import { Box, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewForm } from './components';

export const Reviews = () => {
    const theme = useTheme();
    const { t: storyT } = useTranslation('story');

    return (
        <Box component='section' id='reviews'>
            <Box sx={{ display: 'flex', flex: 1 }}>
                <Box></Box>
                <Box>
                    <Divider sx={{ flex: 1, mt: 12, mb: 6 }}>
                        <Typography
                            component='h1'
                            variant='h1'
                            color={theme.text.title}
                        >
                            {storyT('Reviews.title.h1')}
                        </Typography>
                    </Divider>
                    <ReviewForm />
                </Box>
            </Box>
        </Box>
    );
};
