import { Box, Fab, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UnfinishedUserStoryPreview } from '../../../../../../../packages/types';
import { UnfinishedStoryCarousel } from '../UnfinishedStoryCarousel/UnfinishedStoryCarousel';

type UnfinishedStorySectionProps = {
    allUnfinishedStoriesPreviews: UnfinishedUserStoryPreview[]
}

export const UnfinishedStorySection = ({allUnfinishedStoriesPreviews}: UnfinishedStorySectionProps) => {
    
    const { t } = useTranslation('user-stories');
    const theme = useTheme()

    return (
        <>
            <Typography
                component='h2'
                variant='h2'
                textAlign='center'
                color={theme.text.title}
            >
                {t('title.h2.unfinished-stories')}
            </Typography>
            <Box
                sx={{
                    pt: 4,
                    pb: 4,
                    minHeight: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {allUnfinishedStoriesPreviews.length > 0 ? (
                    <UnfinishedStoryCarousel allUnfinishedStoriesPreviews={allUnfinishedStoriesPreviews} />
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <Typography sx={{ fontSize: 28 }}>{t('text.no-unfinished-story')}</Typography>
                        <Fab
                            variant='extended'
                            color='primary'
                        >
                            {t('button.start-new-story')}
                        </Fab>
                    </Box>
                )}
            </Box>
        </>
    );
};
