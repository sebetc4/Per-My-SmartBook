// Librairies
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
// MUI
import { Box, Container, Divider, Typography, useTheme } from '@mui/material';
// App
import { FinishedPublicStoryPreview } from '../../../../../packages/types';
import { useAppMediaQuery } from '../../../hooks';
import { StoryCard } from './components';
import { BookNotFoundIllustration } from '../../illustrations/BookNotFoundIllustration/BookNotFoundIllustration';
import { SearchBar } from '../../SearchBar/SearchBar';
// Images
import GreenGirlIllustration from '../../../../../../public/images/illustrations/green-girl-illustration.png';
import BoyAndBirdIllustration from '../../../../../../public/images/illustrations/boy-and-bird-illustration.png';
import BlackGirlIllustration from '../../../../../../public/images/illustrations/back-girl-illustration..png';

type PublicStoriesProps = {
    stories: FinishedPublicStoryPreview[];
    total: number;
};

export const PublicStories = ({ stories, total }: PublicStoriesProps) => {
    // Hooks
    const { t: publicStoriesT } = useTranslation('public-stories');
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();
    console.log(stories)

    return (
        <>
            {mediaQuery.upXl && <PublicStoriesBackgroundIllustrations />}
            <Container
                maxWidth='xl'
                sx={{
                    position: 'relative',
                    pt: theme.main.padding,
                    pb: theme.main.padding,
                }}
            >
                <Typography
                    variant='h1'
                    component='h1'
                    color={theme.text.title}
                    sx={{
                        mb: 4,
                        textAlign: { xxs: 'center', md: 'left'},
                    }}
                >
                    {publicStoriesT('title.h1')}
                </Typography>
                <SearchBar />
                <Box
                    sx={{ mt: { xxs: 2, md: 6 }, ml: 'auto', mr: 'auto' }}
                    maxWidth='lg'
                >
                    {stories.length === 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <BookNotFoundIllustration />
                        </Box>
                    ) : (
                        <>
                            {stories.map((story, i) => (
                                <Box key={story.id}>
                                    <StoryCard story={story} />
                                    {i !== stories.length - 1 && (
                                        <Divider
                                            sx={{ mt: 4, mb: 4, backgroundColor: theme.palette.secondary.light }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
};

const PublicStoriesBackgroundIllustrations = () => {
    return (
        <>
            <Image
                src={GreenGirlIllustration}
                alt='Green girl illustration'
                width={459}
                height={768}
                style={{ position: 'absolute', top: 10, right: 20, opacity: 0.4 }}
            />
            <Image
                src={BoyAndBirdIllustration}
                alt='Boy and bird illustration'
                width={514}
                height={514}
                style={{ position: 'absolute', top: 600, left: 20, opacity: 0.4 }}
            />
            <Image
                src={BlackGirlIllustration}
                alt='Boy and bird illustration'
                width={500}
                height={500}
                style={{
                    position: 'absolute',
                    top: 1200,
                    right: 40,
                    opacity: 0.4,
                }}
            />
        </>
    );
};
