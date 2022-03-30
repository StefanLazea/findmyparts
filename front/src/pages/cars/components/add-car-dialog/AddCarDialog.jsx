import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AddCarDialog = (props) => {
    const { open, setOpen } = props;
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adaugare masina</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anulare</Button>
                <Button onClick={handleClose}>Salveaza</Button>
            </DialogActions>
        </Dialog>
    );
}