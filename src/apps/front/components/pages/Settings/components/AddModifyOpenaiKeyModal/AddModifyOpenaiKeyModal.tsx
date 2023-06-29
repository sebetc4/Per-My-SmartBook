// Librairie
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
import {
    AddModifyOpenaiKeyError,
    AddModifyOpenaiKeyBody,
    allAddModifyOpenaiKeyErrors,
} from '~/packages/types';
import { CustomLoadingButton, CustomTextField } from '../../../..';
import { addModifyOpenaiKeySchema } from '~/packages/schemas';
import { addModifyOpenaiKey, setAlert } from '~/store';
import { useAppDispatch, useAppSelector } from '~/apps/front/hooks';

type Action = 'add' | 'modify';

type AddModifyOpenaiKeyModalProps = {
    action: Action;
    open: boolean;
    handleClose: (action: Action) => void;
};

export const AddModifyOpenaiKeyModal = ({ action, open, handleClose }: AddModifyOpenaiKeyModalProps) => {
    // Hooks
    const dispatch = useAppDispatch();
    const { t } = useTranslation('settings');

    // Store
    const { isLoading } = useAppSelector((state) => state.userStoryBeingGenerated);

    // Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddModifyOpenaiKeyBody>({
        resolver: yupResolver(addModifyOpenaiKeySchema),
        mode: 'onTouched',
    });

    const onSubmit = async (body: AddModifyOpenaiKeyBody) => {
        const res = await dispatch(addModifyOpenaiKey(body));
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(setAlert({ type: 'success', message: `success.${action}-openai-key` }));
        } else {
            dispatch(setAlert({ type: 'error', message: `error.${action}-openai-key` }));
        }
        handleClose(action);
        reset();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
        >
            <Box
                component='form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle textAlign='center'>{t(`AddModifyOpenaiKeyModal.title.${action}`)}</DialogTitle>
                <Divider />
                <DialogContent sx={{ mt: 2, mb: 2 }}>
                    <DialogContentText sx={{ mb: 4 }}>{t(`AddModifyOpenaiKeyModal.text.${action}`)}</DialogContentText>
                    <CustomTextField
                        name='key'
                        label={t(`AddModifyOpenaiKeyModal.input.key.label`)}
                        type={'title'}
                        register={register('key')}
                        errorMessage={
                            allAddModifyOpenaiKeyErrors.includes(errors.key?.message as AddModifyOpenaiKeyError)
                                ? t(
                                      `AddModifyOpenaiKeyModal.input.key.error.${
                                          errors.key!.message as AddModifyOpenaiKeyError
                                      }`
                                  )
                                : undefined
                        }
                    />
                </DialogContent>
                <Divider />

                <DialogActions sx={{ display: 'flex', gap: 4 }}>
                    <Button
                        disabled={isLoading}
                        onClick={() => handleClose(action)}
                    >
                        {t('AddModifyOpenaiKeyModal.button.cancel')}
                    </Button>

                    <CustomLoadingButton
                        variant='outlined'
                        disabled={isLoading}
                        loading={isLoading}
                        autoFocus
                        type='submit'
                    >
                        {t(`AddModifyOpenaiKeyModal.button.confirm.${action}`)}
                    </CustomLoadingButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
