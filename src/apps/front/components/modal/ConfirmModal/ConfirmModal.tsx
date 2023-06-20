import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CustomLoadingButton } from '../../buttons/CustomLoadingButton/CustomLoadingButton';

type ConfirmModalProps = {
    open: boolean;
    title: string;
    text: string;
    cancelButtonText: string;
    confirmButtonText: string;
    handleClose: () => void;
    handleConfirm: () => void;
    isLoading: boolean;
};
export const ConfirmModal = ({
    open,
    title,
    text,
    cancelButtonText,
    confirmButtonText,
    handleClose,
    handleConfirm,
    isLoading,
}: ConfirmModalProps) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='confirm-modal-title'
                aria-describedby='confirm-mmodal-description'
            >
                <DialogTitle id='confirm-modal-title'>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='confirm-mmodal-description'>{text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{cancelButtonText}</Button>
                    <CustomLoadingButton
                        disabled={isLoading}
                        loading={isLoading}
                        onClick={handleConfirm}
                        autoFocus
                    >
                        {confirmButtonText}
                    </CustomLoadingButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};
