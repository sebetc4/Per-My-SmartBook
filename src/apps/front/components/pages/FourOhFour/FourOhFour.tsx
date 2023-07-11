// Librairies
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
// Mui
import { Button, Container, Typography, useTheme } from '@mui/material';
//imahes
import LostChildrenIllustration from '../../../../../../public/images/illustrations/lost-children.png';

export const FourOhFour = () => {
    // Hooks
    const { t: fourOfFourT } = useTranslation('404');
    const router = useRouter();
    const theme = useTheme();

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                py: theme.main.padding,
            }}
        >
            <Image
                src={LostChildrenIllustration}
                alt='Enfant perdu'
                placeholder='blur'
                width={500}
                height={500}
                style={{
                    borderRadius: '40px',
                }}
            />
            <Typography
                variant='h3'
                component='h1'
                sx={{ fontWeight: 'bold' }}
            >
                {fourOfFourT('title.h1')}
            </Typography>
            <Typography
                textAlign='center'
                sx={{ maxWidth: '600px', fontSize: '1.2rem' }}
            >
                {fourOfFourT('text.main')}
            </Typography>
            <Button
                variant='outlined'
                onClick={() => router.push('/')}
            >
                {fourOfFourT('button.home')}
            </Button>
        </Container>
    );
};
