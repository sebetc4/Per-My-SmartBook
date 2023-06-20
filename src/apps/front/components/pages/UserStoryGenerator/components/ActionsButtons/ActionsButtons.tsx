// Librairies
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// MUI
import { Box, CircularProgress, Fab, Tooltip } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
// App
import { RestartStoryModal } from '..';
import { useAppSelector } from '~/apps/front/hooks';

export const ActionButtons = () => {
    // Hooks
    const { t: storyGeneratorT } = useTranslation('story-generator');

    // Store
    const { isLoading, data: storyData } = useAppSelector((state) => state.userStoryBeingGenerated);

    // State
    const [openRestartStoryModal, setOpenRestartStoryModal] = useState(false);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {storyData.state !== 'selectOptions' && (
                    <Tooltip title={storyGeneratorT('ActionButtons.button.restart-story.tooltip')}>
                        <span>
                            <Fab
                                color='primary'
                                aria-label={storyGeneratorT('ActionButtons.button.restart-story.tooltip')}
                                disabled={isLoading}
                                onClick={() => setOpenRestartStoryModal(true)}
                            >
                                {isLoading ? <CircularProgress size={24} /> : <ArrowBackIosRoundedIcon />}
                            </Fab>
                        </span>
                    </Tooltip>
                )}
            </Box>
            <RestartStoryModal
                open={openRestartStoryModal}
                handleClose={() => setOpenRestartStoryModal(false)}
            />
        </>
    );
};
