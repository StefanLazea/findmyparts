import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
// import { useFormik } from 'formik';
import { Formik, Form } from 'formik';
import { BODY_STYLE_VARIANTS } from '../mock.js'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Checkbox,
    MenuItem
} from "@mui/material"
import axios from "axios";


export const AddCarDialog = (props) => {
    const { open, setOpen, reRender } = props;
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
    const saveCar = (values) => {
        console.log(values);

        const payload = {
            "VIN": values.vin,
            "numberPlate": values.numberPlate,
            "model": values.model,
            "brand": values.brand,
            //todo
            "type": values.type,
            "isEco": false,
            "isElectric": values.isElectric,
            "isHistoric": values.isHistoric,
            "userId": "a8616d40-927c-11ec-af5a-2bfc6da2f954"
        }
        axios.post("/cars/save", payload).then(res => {
            console.log(res)
            reRender();
            setOpen(false);
        })
    }
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
                        isElectric: false
                    }}
                    onSubmit={values => {
                        // same shape as initial values
                        saveCar(values);
                    }}
                >
                    {({ values, handleChange, setFieldValue }) => (
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
                            <TextField
                                select // tell TextField to render select
                                id="type"
                                name="type"
                                label="caroserie"
                                variant="standard"
                                value={values.body}
                                onChange={handleChange}
                                fullWidth
                            >
                                {BODY_STYLE_VARIANTS.map((item, index) =>
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