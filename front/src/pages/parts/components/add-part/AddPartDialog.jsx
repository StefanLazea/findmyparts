import React, { useRef } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { useGlobalContext } from '../../../../global-context';

// import * as yup from 'yup';
import { Formik, Form } from 'formik';
// import { BODY_STYLE_VARIANTS, FUEL_VARIANTS } from '../mock.js'

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


export const AddPartDialog = (props) => {
    const { open, setOpen, reRender } = props;
    const { state: { userId } } = useGlobalContext();

    const handleClose = () => setOpen(false);
    const formRef = useRef();
    // const validationSchema = yup.object({
    //     vin: yup
    //         .string()
    //         .min(4, 'seria de caroserie este prea scurta')
    //         .required('vin-ul trebuie introdus'),
    //     numberPlate: yup
    //         .string()
    //         .min(7, 'Nu este un numar corect')
    //         .required('Numarul trebuie introdus'),

    // });

    const savePart = (values) => {
        const payload = {
            code: values.code,
            name: values.name,
            price: values.price,
            quantity: values.stock,
            photo: "",
            userId: userId

        }
        console.log(values)
        axios.post("/parts", payload).then(res => {
            // reRender();
            console.log(res)

            setOpen(false);
        })
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adaugare piesa</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Avem nevoie de urmatoarele detalii pentru a retine piesa pe care o ai.
                </DialogContentText>
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        code: "",
                        name: "",
                        price: 0,
                        quantity: 0,
                        photo: "",
                        userId: userId
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        savePart(values);
                    }}
                >
                    {({ values, errors, handleChange, setFieldValue }) => (
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
                                error={errors.numberPlate}
                                helperText={errors.numberPlate}
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
                                error={errors.vin}
                                helperText={errors.vin}
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