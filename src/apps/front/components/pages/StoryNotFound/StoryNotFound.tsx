// Librairies
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
// Mui
import { Button, Container, Typography, useTheme } from '@mui/material';
//imahes
import NoStoryImage from '../../../../../../public/images/illustrations/no-story-found.png';

export const StoryNotFound = () => {
    // Hooks
    const { t: storyNotFounndT } = useTranslation('story-not-found');
    const router = useRouter();
    const theme = useTheme();

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, mt: 6, mb: 6 }}>
            <Image
                src={NoStoryImage}
                alt={storyNotFounndT('image.alt')}
                placeholder='blur'
                width={500}
                height={500}
                style={{
                    borderRadius: '40px',
                }}
                quality={100}
            />
            <Typography
                color={theme.text.title}
                variant='h3'
                component='h1'
                sx={{ fontWeight: 'bold' }}
            >
                {storyNotFounndT('title.h1')}
            </Typography>
            <Typography
                color={theme.text.body}
                textAlign='center'
                sx={{ maxWidth: '600px', fontSize: '1.2rem' }}
            >
                {storyNotFounndT('text.main')}
            </Typography>
            <Button
                variant='outlined'
                onClick={() => router.push('/')}
            >
                {storyNotFounndT('button.public-story')}
            </Button>
        </Container>
    );
};
