import React from 'react';
import { DialogTitle, Dialog, Fab, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const DocumentDetailDialog = ({ documentDetail, open, setOpen }) => {
    console.log('DIALOG', documentDetail);
    return (
        <Dialog open={open} onClose={() => setOpen((prev) => !prev)}>
            <DialogTitle>Documentul {documentDetail.label}</DialogTitle>
            <DialogContent>
                <Fab color="primary" aria-label="add">
                    <DeleteIcon />
                </Fab>
            </DialogContent>
        </Dialog>
    );
};
