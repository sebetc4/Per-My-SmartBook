// Librairies
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import * as yup from 'yup';
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
    BaseTextFieldProps,
} from '@mui/material';
// App
import { CustomTextField } from '../../inputs/CustomTextField/CustomTextField';
import { CustomLoadingButton } from '../../buttons/CustomLoadingButton/CustomLoadingButton';
import { useAppSelector } from '~/apps/front/hooks';

type FormModalProps<T> = {
    title: string;
    text: string;
    open: boolean;
    handleClose: () => void;
    handleConfirm: (data: T) => void;
    inputName: string;
    inputLabel: string;
    inputType: BaseTextFieldProps['type'];
    inputMessageError: string | null;
    cancelButtonText: string;
    confirmButtonText: string;
    yupSchema: yup.SchemaOf<T>;
    handleError: (error?: FieldErrors) => void;
};

export const FormModal = <T extends {}>({
    title,
    text,
    open,
    handleClose,
    handleConfirm,
    inputName,
    inputLabel,
    inputType,
    inputMessageError,
    cancelButtonText,
    confirmButtonText,
    yupSchema,
    handleError,
}: FormModalProps<T>) => {
    // Store
    const { isLoading } = useAppSelector((state) => state.userStoryBeingGenerated);

    // Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({
        resolver: yupResolver(yupSchema),
        mode: 'onChange',
    });

    useEffect(() => {
        handleError(errors);
    }, [errors, handleError, inputName]);

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
                <DialogTitle textAlign='center'>{title}</DialogTitle>
                <Divider />
                <DialogContent sx={{ mt: 2, mb: 2 }}>
                    <DialogContentText sx={{ mb: 4 }}>{text}</DialogContentText>
                    <CustomTextField
                        name={inputName}
                        type={inputType}
                        autoFocus
                        label={inputLabel}
                        register={register(yup.reach(yupSchema, inputName))}
                        errorMessage={inputMessageError || undefined}
                    />
                </DialogContent>
                <Divider />

                <DialogActions sx={{ display: 'flex', gap: 4 }}>
                    <Button
                        disabled={isLoading}
                        onClick={handleClose}
                    >
                        {cancelButtonText}
                    </Button>

                    <CustomLoadingButton
                        variant='outlined'
                        disabled={isLoading}
                        loading={isLoading}
                        autoFocus
                        type='submit'
                    >
                        {confirmButtonText}
                    </CustomLoadingButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
