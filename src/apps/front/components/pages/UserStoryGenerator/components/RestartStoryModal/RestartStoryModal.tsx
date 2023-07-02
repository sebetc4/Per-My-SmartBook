// Librairies
import { useTranslation } from 'react-i18next';
// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// App
import { resetUserStoryBeingGeneratedState, deleteUnfinishedStory } from '~/store';
import { Path } from '~/packages/types';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';
import { setUrlWithoutReload } from '~/apps/front/utils';
import { CustomLoadingButton } from '~/apps/front/components';

type RestartStoryModalProps = {
    open: boolean;
    handleClose: () => void;
};

export const RestartStoryModal = ({ open, handleClose }: RestartStoryModalProps) => {
    // Hooks
    const dispatch = useAppDispatch();
    const { t: storyGeneratorT } = useTranslation('story-generator');

    // Store
    const { data: storyData } = useAppSelector((state) => state.userStoryBeingGenerated);
    const { isLoading: deleteStoryIsLoading } = useAppSelector((state) => state.userStories);

    const handleDeleteAndRestartStory = async () => {
        await dispatch(deleteUnfinishedStory(storyData.id!));
        handleRestartStory();
    };

    const handleRestartStory = () => {
        dispatch(resetUserStoryBeingGeneratedState());
        setUrlWithoutReload(Path.USER_STORY_GENERATOR);
        handleClose();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='restart-story-modal-title'
                aria-describedby='restart-story-mmodal-description'
            >
                <DialogTitle id='restart-story-modal-title'>{storyGeneratorT('RestartStoryModal.title')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='restart-story-mmodal-description'>
                        {storyGeneratorT('RestartStoryModal.text')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={deleteStoryIsLoading}
                        onClick={handleClose}
                    >
                        {storyGeneratorT('RestartStoryModal.button.cancel')}
                    </Button>
                    <CustomLoadingButton
                        disabled={deleteStoryIsLoading}
                        loading={deleteStoryIsLoading}
                        onClick={handleDeleteAndRestartStory}
                    >
                        {storyGeneratorT('RestartStoryModal.button.delete-restart')}
                    </CustomLoadingButton>
                    <Button
                        disabled={deleteStoryIsLoading}
                        onClick={handleRestartStory}
                        autoFocus
                    >
                        {storyGeneratorT('RestartStoryModal.button.restart')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
