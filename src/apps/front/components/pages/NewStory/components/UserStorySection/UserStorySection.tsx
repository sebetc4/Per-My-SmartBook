import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Box, Divider, Typography, useTheme } from '@mui/material';

import { StartUserStoryButton } from '..';

import ImaginaryWorldBackground from '../../../../../../../../public/images/illustrations/imaginary-world.png';
import { useAppMediaQuery } from '~/apps/front/hooks';

export const UserStorySection = () => {
    const theme = useTheme();
    const { t: newStoryT } = useTranslation('new-story');
    const { mediaQuery } = useAppMediaQuery();

    return (
        <Box
            component='section'
            sx={{
                p: { xxs: 4, sm: 8 },
                boxShadow: theme.papel.boxShadow,
                backgroundColor: theme.papel.backgroundColor,
                borderRadius: { xxs: 5, md: 0 },
            }}
        >
            <Box sx={{ p: { xxs: 2, md: 0 } }}>
                <Typography
                    variant='h2'
                    component='h2'
                    textAlign='center'
                    color={theme.text.title}
                    sx={{ px: { ssx: 0, md: 8 } }}
                >
                    {newStoryT('UserStorySection.title.h2')}
                </Typography>
                <Divider sx={{ my: { xxs: 4, md: 8 } }} />
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
                <Divider sx={{ my: { xxs: 4, md: 8 } }} />
            </Box>
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    aspectRatio: { xxs: 'none', sm: '7/4' },
                    width: '100%',
                    height: 'auto',
                }}
            >
                <StartUserStoryButton />
                {mediaQuery.upSm && (
                    <>
                        <Image
                            src={ImaginaryWorldBackground}
                            alt='Imaginary world background'
                            fill
                            placeholder='blur'
                            style={{
                                zIndex: 0,
                                opacity: 0.6,
                            }}
                            quality={100}
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
                    </>
                )}
            </Box>
        </Box>
    );
};
