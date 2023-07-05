// Librairies
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
// Mui
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
//imahes
import NoStoryImage from '../../../../../../public/images/illustrations/no-story-found.png';
import { Path } from '~/packages/types';

export const StoryNotFound = () => {
    // Hooks
    const { t: storyNotFounndT } = useTranslation('story-not-found');
    const router = useRouter();
    const theme = useTheme();

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, mt: 6, mb: 6 }}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '500px',
                    aspectRatio: '1/1',
                }}
            >
                <Image
                    src={NoStoryImage}
                    alt={storyNotFounndT('image.alt')}
                    placeholder='blur'
                    fill
                    style={{
                        borderRadius: '40px',
                    }}
                    quality={100}
                />
            </Box>
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
            <Box sx={{ display: 'flex', flexDirection: { xxs: 'column', xs: 'row' }, gap: 4 }}>
                <Button
                    variant='outlined'
                    onClick={() => router.push(Path.NEW_STORY)}
                >
                    {storyNotFounndT('button.new-story')}
                </Button>
                <Button
                    variant='outlined'
                    onClick={() => router.push(Path.PUBLIC_STORIES)}
                >
                    {storyNotFounndT('button.public-story')}
                </Button>
            </Box>
        </Container>
    );
};
