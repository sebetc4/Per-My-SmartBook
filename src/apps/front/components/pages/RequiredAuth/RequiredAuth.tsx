import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Box, Button, Container, Typography, useTheme } from '@mui/material';

import RequiredAuthImage from '../../../../../../public/images/illustrations/required-auth.png';
import { Path } from '../../../../../packages/types';

export const RequiredAuth = () => {
    //Hooks
    const router = useRouter();
    const theme = useTheme();
    const { t: requiredAuthT } = useTranslation('required-auth');

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                pt: theme.main.padding,
                pb: theme.main.padding,
            }}
        >
            <Image
                src={RequiredAuthImage}
                placeholder='blur'
                alt='Enfant perdu'
                width={350}
                height={350}
                style={{
                    borderRadius: '40px',
                }}
            />
            <Typography
                variant='h3'
                component='h1'
                sx={{ fontWeight: 'bold' }}
            >
                {requiredAuthT('title.h1')}
            </Typography>
            <Typography
                textAlign='center'
                sx={{ maxWidth: '600px', fontSize: '1.2rem' }}
            >
                {requiredAuthT('text.main')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 6 }}>
                <Button
                    onClick={() => router.push(Path.SIGNUP)}
                    variant='outlined'
                >
                    {requiredAuthT('button.signup')}
                </Button>
                <Button
                    onClick={() => router.push(Path.SIGNIN)}
                    variant='outlined'
                >
                    {requiredAuthT('button.login')}
                </Button>
            </Box>
        </Container>
    );
};
