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
import { finishedStoryTitleSchema } from '~/packages/schemas';
import { allSaveStoryErrors, FinishedStoryTitle, SaveStoryError, Visibility } from '~/packages/types';
import { useAppSelector } from '~/apps/front/hooks';
import { CustomTextField } from '~/apps/front/components/inputs/CustomTextField/CustomTextField';
import { CustomLoadingButton } from '~/apps/front/components/buttons/CustomLoadingButton/CustomLoadingButton';

type SaveModalProps = {
    open: boolean;
    handleClose: () => void;
    handleConfirm: (data: FinishedStoryTitle) => void;
    visibility: Visibility;
};

export const SaveModal = ({ open, handleClose, handleConfirm, visibility }: SaveModalProps) => {
    // Hooks
    const { t } = useTranslation('story-generator');

    // Store
    const { isLoading } = useAppSelector((state) => state.userStoryBeingGenerated);

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FinishedStoryTitle>({
        resolver: yupResolver(finishedStoryTitleSchema),
        mode: 'onChange',
    });

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
        >
            <Box
                component='form'
                onSubmit={handleSubmit(handleConfirm)}
            >
                <DialogTitle textAlign='center'>{t(`SaveModal.${visibility}.title`)}</DialogTitle>
                <Divider />
                <DialogContent sx={{ mt: 2, mb: 2 }}>
                    <DialogContentText sx={{ mb: 4 }}>{t(`SaveModal.${visibility}.text`)}</DialogContentText>
                    <CustomTextField
                        name='title'
                        autoFocus
                        label={t('SaveModal.input.title.label')}
                        type={'title'}
                        register={register('title')}
                        disabled={isLoading}
                        errorMessage={
                            allSaveStoryErrors.includes(errors.title?.message as SaveStoryError)
                                ? t(`SaveModal.input.title.error.${errors.title!.message as SaveStoryError}`)
                                : undefined
                        }
                    />
                </DialogContent>
                <Divider />

                <DialogActions sx={{display: 'flex', gap: 4}}>
                    <Button
                        disabled={isLoading}
                        onClick={handleClose}
                    >
                        {t('SaveModal.button.cancel')}
                    </Button>

                    <CustomLoadingButton
                        variant='outlined'
                        disabled={isLoading}
                        loading={isLoading}
                        autoFocus
                        type='submit'
                    >
                        {t(`SaveModal.${visibility}.button.save`)}
                    </CustomLoadingButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
