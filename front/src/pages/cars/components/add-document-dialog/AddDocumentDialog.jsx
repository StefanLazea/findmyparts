import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Formik, Form } from 'formik';
import { BODY_STYLE_VARIANTS, FUEL_VARIANTS } from '../mock.js'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Checkbox,
    MenuItem,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Typography
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AddDocumentDialog = (props) => {
    const { open, setOpen, reRender } = props;
    const handleClose = () => setOpen(false);
    const formRef = useRef();

    const saveDocument = (values) => {
        console.log(values)
    }
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Adauga un nou document
                    </Typography>

                </Toolbar>
            </AppBar>
            <DialogContent>
                <DialogContentText>
                    Adauga documentul tau. Incepe experienta prin alegerea tipului
                </DialogContentText>
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        numberPlate: '',
                        brand: '',
                        model: '',
                        type: BODY_STYLE_VARIANTS[0],
                        vin: '',
                        fuel: FUEL_VARIANTS[0],
                        isHistoric: true,
                        isElectric: false
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        saveDocument(values);
                    }}
                >
                    {({ values, errors, handleChange, setFieldValue }) => (
                        <Form>

                            <TextField
                                autoFocus
                                id="model"
                                name="model"
                                label="model"
                                value={values.model}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                id="brand"
                                name="brand"
                                label="brand"
                                value={values.brand}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                            />
                            <TextField
                                select // tell TextField to render select
                                id="type"
                                name="type"
                                label="caroserie"
                                variant="standard"
                                value={values.type}
                                onChange={handleChange}
                                fullWidth
                            >
                                {BODY_STYLE_VARIANTS.map((item, index) =>
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                )}
                            </TextField>
                            <TextField
                                select // tell TextField to render select
                                id="fuel"
                                name="fuel"
                                label="combustibil"
                                variant="standard"
                                value={values.fuel}
                                onChange={handleChange}
                                fullWidth
                            >
                                {FUEL_VARIANTS.map((item, index) =>
                                    <MenuItem key={index} value={item}>
                                        {item}
                                    </MenuItem>
                                )}


                            </TextField>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="isHistoric"
                                            onChange={(e) => setFieldValue(e.target.name, e.target.checked)}

                                        />}
                                    label="Vehicul istoric"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="isElectric"
                                            onChange={(e) => setFieldValue(e.target.name, e.target.checked)}

                                        />
                                    }

                                    label="Vehicul electric" />
                            </FormGroup>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anulare</Button>
                <Button onClick={() => formRef.current.submitForm()}>Salveaza</Button>

            </DialogActions>
        </Dialog>
    );
}