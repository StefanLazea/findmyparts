import React from 'react';
import {
    DialogTitle,
    Dialog,
    Fab,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const DocumentDetailDialog = ({ documentDetail, open, setOpen }) => {
    console.log('DIALOG', documentDetail);
    return (
        <Dialog open={open} onClose={() => setOpen((prev) => !prev)}>
            <DialogTitle>
                Detalii legate despre {documentDetail.label}
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
                <Button onClick={() => {}}>Stergere</Button>

                <Button onClick={() => {}}>Anulare</Button>
                <Button onClick={() => {}}>Salveaza</Button>
            </DialogActions>
        </Dialog>
    );
};
