// Libraries
import Image from 'next/image';
import React from 'react';
// App
import { useAppSelector } from '~/apps/front/hooks';
// Mui
import { Box, useTheme } from '@mui/material';
// Images
import MachineIllustration from 'public/images/illustrations/machine-illustration.png';
import ImaginaryWorldIllustration from 'public/images/illustrations/imaginary-world2.png';

type BackgroundPaperProps = {
    children: JSX.Element;
    withImage?: boolean;
};

export const BackgroundPaper = ({ children, withImage }: BackgroundPaperProps) => {
    const theme = useTheme();
    const { colorMode } = useAppSelector((state) => state.app);

    return (
        <>
            <style>
                { `
                    .letter {
                        background: ${theme.papel.backgroundColor};
                        box-shadow: ${theme.papel.boxShadow};
                        z-index: 0;
                        position: relative;
                    }

                    .letter:before, .letter:after {
                        content: "";
                        background: ${theme.papel.backgroundColor};
                        box-shadow: ${theme.papel.beforeAfterBoxShadow};
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        z-index: -2;
                        transition: .5s;
                    }

                    .letter:before {
                        left: -5px;
                        top: 2px;  
                        transform: rotate(-1.5deg);
                    }
                    
                    .letter:after {
                        right: -3px;
                        top: 0px;
                        transform: rotate(2.4deg);
                    }
                    
                    .letter:hover:before {
                    transform: rotate(0deg);
                    border-width: 0px 0px 0px 1px;
                    left: -6px;
                    top: -6px; 
                    }
                    
                    .letter:hover:after {
                    transform: rotate(0deg);
                    border-width: 0px 0px 0px 1px;
                    right: 3px;
                    top: -3px;
                    }
                `}
            </style>
            <Box className='letter'>
                {children}
                {withImage && (
                    <>
                        <Image
                            src={MachineIllustration}
                            alt='Machine illustration'
                            width={200}
                            height={200}
                            style={{ position: 'absolute', top: 10, right: 5, zIndex: 1, opacity: 0.3 }}
                            className='illustration'
                        />
                        <Image
                            src={ImaginaryWorldIllustration}
                            alt='Machine illustration'
                            width={250}
                            height={250}
                            style={{ position: 'absolute', top: 10, left: 5, zIndex: 1, opacity: 0.3 }}
                            className='illustration'
                        />
                    </>
                )}
            </Box>
        </>
    );
};
