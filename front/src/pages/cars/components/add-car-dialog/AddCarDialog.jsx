import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Checkbox
} from "@mui/material"


export const AddCarDialog = (props) => {
    const { open, setOpen } = props;
    const handleClose = () => setOpen(false);
    const handleSave = () => {


    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adaugare masina</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Avem nevoie de urmatoarele detalii pentru a retine masina ta.
                </DialogContentText>

                <TextField
                    autoFocus
                    id="brand"
                    label="numar inmatriculare"
                    variant="standard"
                    fullWidth
                />
                <TextField
                    autoFocus
                    id="model"
                    label="vin"
                    variant="standard"
                    fullWidth
                />
                <TextField
                    autoFocus
                    id="type"
                    label="model"
                    variant="standard"
                    fullWidth
                />
                {/* add select soon */}
                <TextField
                    autoFocus
                    id="type"
                    label="brand"
                    variant="standard"
                    fullWidth
                />
                <TextField
                    autoFocus
                    id="type"
                    label="caroserie"
                    variant="standard"
                    fullWidth
                />
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Vehicul istoric" />
                    <FormControlLabel disabled control={<Checkbox />} label="Vehicul electric" />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anulare</Button>
                <Button onClick={handleSave}>Salveaza</Button>
            </DialogActions>
        </Dialog>
    );
}