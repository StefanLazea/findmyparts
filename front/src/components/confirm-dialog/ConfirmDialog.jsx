import React from 'react';
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';

export const ConfirmDialog = ({ open, setOpen, onConfirmClick, message }) => {
    return (
        <Dialog open={open} onClose={() => setOpen((prev) => !prev)}>
            <DialogTitle>Info</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Anulare</Button>
                <Button onClick={onConfirmClick}>Da</Button>
            </DialogActions>
        </Dialog>
    );
};
