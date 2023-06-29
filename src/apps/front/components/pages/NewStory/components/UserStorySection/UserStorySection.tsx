import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Box, Divider, Typography, useTheme } from '@mui/material';

import { StartUserStoryButton } from '..';

import ImaginaryWorldBackground from '../../../../../../../../public/images/illustrations/imaginary-world.png';

export const UserStorySection = () => {
    const theme = useTheme();
    const { t: newStoryT } = useTranslation('new-story');

    return (
        <Box
            component='section'
            sx={{
                width: '100%',
                p: { xxs: 2, md: 8 },
                boxShadow: { xxs: '0 0 10px rgba(0,0,0,0.3), 0 0 300px 25px rgba(222,198,122,0.7) inset', md: 'none' },
            }}
        >
            <Box sx={{ p: { xxs: 2, md: 0 } }}>
                <Typography
                    variant='h2'
                    component='h2'
                    textAlign='center'
                    color={theme.text.title}
                    sx={{
                        pl: { ssx: 0, md: 8 },
                        pr: { ssx: 0, md: 8 },
                    }}
                >
                    {newStoryT('UserStorySection.title.h2')}
                </Typography>
                <Divider
                    sx={{
                        mt: { xxs: 2, md: 8 },
                        mb: { xxs: 2, md: 8 },
                    }}
                />
                <Typography
                    variant='body1'
                    color={theme.text.body}
                    sx={{
                        maxWidth: '600px',
                        textAlign: 'center',
                        ml: 'auto',
                        mr: 'auto',
                    }}
                >
                    {newStoryT('UserStorySection.text')}
                </Typography>
                <Divider
                    sx={{
                        mt: { xxs: 2, md: 8 },
                        mb: { xxs: 2, md: 8 },
                    }}
                />
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    aspectRatio: '16/9',
                    width: '100%',
                    height: 'auto',
                }}
            >
                <StartUserStoryButton />

                <Image
                    src={ImaginaryWorldBackground}
                    alt='Imaginary world background'
                    fill
                    placeholder='blur'
                    style={{
                        zIndex: 0,
                        opacity: 0.6,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        inset: 0,
                        zIndex: 1,
                        boxShadow: `inset 0px 0px 40px 10px ${theme.papel.backgroundColor}`,
                    }}
                />
            </Box>
        </Box>
    );
};
