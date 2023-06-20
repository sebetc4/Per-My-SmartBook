// Librairies
import React from 'react';
import Image from 'next/image';
// MUI
import { Box, Fab } from '@mui/material';
// App
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '~/apps/front/hooks';
//Images
import ButtonBackground from 'public/images/buttons/start-new-story.png';

export const StartStoryButton = () => {
    const { t: storyGeneratorT } = useTranslation('story-generator');
    const { isLoading } = useAppSelector((app) => app.userStoryBeingGenerated);

    return (
        <Box
            sx={{
                position: 'relative',
                width: '500px',
                aspectRatio: '1.54',
                zIndex: 3,
                overflow: 'hidden',
                transition: 'all ease 0.5s',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Fab
                variant='extended'
                type='submit'
                color='primary'
                disabled={isLoading}
                sx={{
                    height: '75px',
                    width: '158px',
                    ml: 0.3,
                    mb: 1.6,
                    fontSize: '1.1rem',
                }}
            >
                {storyGeneratorT('OptionsForm.button.start')}
            </Fab>

            <Image
                src={ButtonBackground}
                alt='test'
                fill
                quality={100}
                style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    zIndex: 0,
                }}
            />
        </Box>
    );
};
