// Librairies
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
// MUI
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Divider,
} from '@mui/material';
// App
import { useAppDispatch, useAppMediaQuery, useAppSelector } from '~/apps/front/hooks';
import { CustomLoadingButton } from '~/apps/front/components/buttons/CustomLoadingButton/CustomLoadingButton';
import { deleteUnfinishedStory, resetUserStoryBeingGeneratedState } from '~/store';
import { setUrlWithoutReload } from '~/apps/front/utils';
import { Path } from '~/packages/types';

type DeleteModalProps = {
    open: boolean;
    handleClose: () => void;
};

export const DeleteModal = ({ open, handleClose }: DeleteModalProps) => {
    // Hooks
    const { t: storyGeneratorT } = useTranslation('story-generator');
    const { mediaQuery } = useAppMediaQuery();
    const dispatch = useAppDispatch();

    // Store
    const { layout } = useAppSelector((state) => state.app);
    const { data: storyData } = useAppSelector((state) => state.userStoryBeingGenerated);
    const { isLoading} = useAppSelector((state) => state.userStories);

    const handleDeleteStory = async () => {
        await dispatch(deleteUnfinishedStory(storyData.id!));
        dispatch(resetUserStoryBeingGeneratedState());
        setUrlWithoutReload(Path.USER_STORY_GENERATOR);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={!mediaQuery.upSm}
            maxWidth='sm'
        >
            <Box
                sx={{
                    mt: { xxs: `${layout.headerHeight}px`, sm: 0 },
                }}
            >
                <DialogTitle textAlign='center'>{storyGeneratorT(`DeleteModal.title`)}</DialogTitle>
                <Divider />
                <DialogContent sx={{ mt: 2, mb: 2 }}>
                    <DialogContentText sx={{ mb: 4 }}>{storyGeneratorT(`DeleteModal.text`)}</DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions sx={{ display: 'flex', gap: 4 }}>
                    <Button
                        disabled={isLoading}
                        onClick={handleClose}
                    >
                        {storyGeneratorT('DeleteModal.button.cancel')}
                    </Button>

                    <CustomLoadingButton
                        variant='outlined'
                        disabled={isLoading}
                        loading={isLoading}
                        autoFocus
                        onClick={handleDeleteStory}
                    >
                        {storyGeneratorT(`DeleteModal.button.delete`)}
                    </CustomLoadingButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
