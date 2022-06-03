import React from 'react';
import moment from 'moment';
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

export const DocumentDetailDialog = ({ documentDetail, open, setOpen }) => {
    console.log('DIALOG', documentDetail);
    return (
        <Dialog open={open} onClose={() => setOpen((prev) => !prev)}>
            <DialogTitle>
                Detalii legate despre {documentDetail.label}
            </DialogTitle>
            <DialogContent>
                <Typography variant="h5" component="h5">
                    Documentul expira la data{' '}
                    {moment(documentDetail.documentData.expirationData).format(
                        'DD-MM-YYYY'
                    )}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {}}>Anulare</Button>
                <Button onClick={() => {}}>Salveaza</Button>
            </DialogActions>
        </Dialog>
    );
};
