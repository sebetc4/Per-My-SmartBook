// Librairies
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
// MUI
import { Box, Container, Divider, Pagination, Typography, useTheme } from '@mui/material';
// App
import { FinishedPublicStoryPreview } from '../../../../../packages/types';
import { useAppMediaQuery } from '../../../hooks';
import { StoryCard } from './components';
import { publicStoriesPerPage } from '~/packages/constants';
import { BookNotFoundIllustration, SearchBar } from '../..';
// Images
import GreenGirlIllustration from '/public/images/illustrations/green-girl-illustration.png';
import BoyAndBirdIllustration from '/public/images/illustrations/boy-and-bird-illustration.png';
import BlackGirlIllustration from '/public/images/illustrations/back-girl-illustration.png';
import BoyAndImaginaryWorldIllustration from '/public/images/illustrations/boy-and-imaginary-world.png';
import GirlAndDogIllustration from '/public/images/illustrations/girl-and-dog.png';
import ImaginaryWorldIllustration from '/public/images/illustrations/imaginary-world4.png';
import GirlWithBookIllustration from '/public/images/illustrations/girl-with-book.png';

type PublicStoriesProps = {
    stories: FinishedPublicStoryPreview[];
    total: number;
};

export const PublicStories = ({ stories, total }: PublicStoriesProps) => {
    // Hooks
    const { t: publicStoriesT } = useTranslation('public-stories');
    const theme = useTheme();
    const { mediaQuery } = useAppMediaQuery();
    const router = useRouter();

    const { p: queryPage } = router.query;
    const currentPage = typeof queryPage === 'string' ? +queryPage : 1;

    const handleChangeCurrentPage = (e: ChangeEvent<unknown>, value: number) => {
        let query = new URLSearchParams(window.location.search);
        if (query.has('p')) {
            query.set('p', value.toString());
        } else {
            query.append('p', value.toString());
        }
        router.replace({ search: query.toString() });
    };

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
                        textAlign: { xxs: 'center', md: 'left' },
                    }}
                >
                    {publicStoriesT('title.h1')}
                </Typography>
                <SearchBar />
                <Box
                    sx={{ mt: 6, ml: 'auto', mr: 'auto' }}
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
                {publicStoriesPerPage < total && (
                    <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={Math.ceil(total / publicStoriesPerPage)}
                            page={currentPage}
                            onChange={handleChangeCurrentPage}
                            color='primary'
                        />
                    </Box>
                )}
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
                quality={100}
            />
            <Image
                src={BoyAndBirdIllustration}
                alt='Boy and bird illustration'
                width={514}
                height={514}
                style={{ position: 'absolute', top: 600, left: 20, opacity: 0.4 }}
                quality={100}
            />
            <Image
                src={BoyAndImaginaryWorldIllustration}
                alt='Boy and imaginary world illustration'
                width={500}
                height={500}
                style={{
                    position: 'absolute',
                    top: 1200,
                    right: 40,
                    opacity: 0.4,
                }}
                quality={100}
            />
            <Image
                src={GirlAndDogIllustration}
                alt='Girl and dog illustration'
                width={500}
                height={500}
                style={{
                    position: 'absolute',
                    top: 1800,
                    left: 40,
                    opacity: 0.4,
                }}
                quality={100}
            />
            <Image
                src={ImaginaryWorldIllustration}
                alt='Imaginary world illustration'
                width={500}
                height={500}
                style={{
                    position: 'absolute',
                    top: 2400,
                    right: 40,
                    opacity: 0.4,
                }}
                quality={100}
            />
            <Image
                src={GirlWithBookIllustration}
                alt='A girl with a book illustration'
                width={500}
                height={500}
                style={{
                    position: 'absolute',
                    top: 3200,
                    left: 40,
                    opacity: 0.4,
                }}
                quality={100}
            />
            <Image
                src={BlackGirlIllustration}
                alt='A black girl illustration'
                width={500}
                height={500}
                style={{
                    position: 'absolute',
                    top: 3800,
                    right: 40,
                    opacity: 0.4,
                }}
                quality={100}
            />
        </>
    );
};
