import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
// import { useFormik } from 'formik';
import { Formik, Form, Field } from 'formik';

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
    const formRef = useRef();
    // const validationSchema = yup.object({
    //     brand: yup
    //         .string('Enter the brand')
    //         .required('Email is required'),
    //     model: yup
    //         .string('Enter the model')
    //         .required('Model is required'),
    // });
    // const formik = useFormik({
    //     initialValues: {
    //         numberPlate: '',
    //         brand: '',
    //         model: '',
    //         type: '',
    //         vin: ''
    //     },
    //     // validationSchema: validationSchema,
    //     onSubmit: (values) => {
    //         console.log(values)
    //     },
    // });
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adaugare masina</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Avem nevoie de urmatoarele detalii pentru a retine masina ta.
                </DialogContentText>
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        numberPlate: '',
                        brand: '',
                        model: '',
                        type: '',
                        vin: '',
                        isHistoric: true,
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField
                                autoFocus
                                id="numberPlate"
                                name="numberPlate"
                                label="numar inmatriculare"
                                value={values.numberPlate}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                id="vin"
                                name="vin"
                                label="vin"
                                value={values.vin}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                            />
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
                            {/* add select soon */}
                            <TextField
                                autoFocus
                                id="type"
                                name="type"
                                label="type"
                                variant="standard"
                                value={values.type}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                id="body"
                                name="body"
                                label="caroserie"
                                value={values.body}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                            />
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="isHistoric"
                                            checked
                                        />}
                                    label="Vehicul istoric"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="isElectric"
                                            checked
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