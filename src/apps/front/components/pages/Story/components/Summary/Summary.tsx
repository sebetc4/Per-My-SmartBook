// Librairies
import { useTranslation } from 'react-i18next';
// MUI
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
// App
import { useAppSelector } from '~/apps/front/hooks';
import { toRoman } from '~/packages/functions';

type SummaryProps = {
    navigateToSlide: (slide: number) => void;
};

export const Summary = ({ navigateToSlide }: SummaryProps) => {
    // Hooks
    const theme = useTheme();
    const { t: storyT } = useTranslation('story');

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
            <Divider>
                <Typography
                    variant='h2'
                    component='h2'
                    color={theme.text.title}
                >
                    {storyT('Summary.title.h2')}
                </Typography>
            </Divider>
            <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {storyData!.allChapters.map((chapter, i) => (
                    <Button
                        key={i}
                        sx={{ display: 'flex', alignItems: 'end' }}
                        onClick={() => navigateToSlide(i + 2)}
                    >
                        <Typography
                            color={theme.text.body}
                            sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                        >
                            {`${toRoman(i + 1)}`}. {chapter.title}
                        </Typography>
                        <Box
                            flex={1}
                            sx={{
                                mx: 3,
                                height: '1px',
                                borderTop: `dotted 3px ${theme.text.body}`,
                                mb: 1,

                            }}
                        />
                        <Typography color={theme.text.body}> {`p.${i + 2}`}</Typography>
                    </Button>
                ))}
            </Box>
        </Box>
    );
};
