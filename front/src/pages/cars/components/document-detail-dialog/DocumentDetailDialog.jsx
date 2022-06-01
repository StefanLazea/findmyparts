import React from 'react';
import { DialogTitle, Dialog } from '@mui/material';

export const DocumentDetailDialog = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onClose={() => setOpen((prev) => !prev)}>
            <DialogTitle>Documentul</DialogTitle>
        </Dialog>
    );
};
