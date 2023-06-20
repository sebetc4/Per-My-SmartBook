import { useAppSelector } from '~/apps/front/hooks';
import { getRandomHourglassImage, placeholderValue } from '~/apps/front/utils';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const Cover = () => {
    // Hooks
    const { t: storyT } = useTranslation('story');
    const theme = useTheme()

    // Store
    const { storyData } = useAppSelector((state) => state.story);

    return (
        <Box
            component='section'
            sx={{
                height: '100%',
                border: '1px solid #c2b5a3',
                background: theme.papel.backgroundColor,
                boxShadow: theme.papel.boxShadow,
                padding: 8,
            }}
        >
            <Typography
                textAlign='center'
                component='h1'
                variant='h1'
                color={theme.text.title}
                sx={{
                    mb: 6,
                }}
            >
                {storyData!.title}
            </Typography>
            <Box
                sx={{
                    mx: 'auto',
                    position: 'relative',
                    width: '100%',
                    maxWidth: '512px',
                    aspectRatio: '1 / 1',
                }}
            >
                <Image
                    src={storyData!.cover?.url || getRandomHourglassImage()}
                    alt={"Couverture de l'histoire"}
                    placeholder={placeholderValue(!!storyData!.cover?.plaiceholder)}
                    blurDataURL={storyData!.cover?.plaiceholder}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </Box>
            <Divider
                sx={{ mt: 6 }}
                textAlign='left'
            >
                <Typography
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                    }}
                    color={theme.text.subtitle}
                >
                    {storyData!.author?.username
                        ? `${storyT('Cover.text.author')} ${storyData!.author.username}`
                        : storyT('Cover.text.commun')}
                </Typography>
            </Divider>
            <Typography
            color={theme.text.title} 
            sx={{ 
                mt: 6, 
                fontSize: '1.3rem', 
                fontWeight: 500 
                }}>
                Le {new Date(storyData!.createdAt).toLocaleDateString()}
            </Typography>
        </Box>
    );
};
