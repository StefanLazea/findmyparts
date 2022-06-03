import React, { useRef } from 'react';
import { useGlobalContext } from 'global-context';

import { toast } from 'react-toastify';
// import * as yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField
} from '@mui/material';
// import styles from './AddPartDialog.module.scss';

export const AddPartDialog = (props) => {
    const { open, setOpen } = props;
    const {
        state: { userId, socket }
    } = useGlobalContext();

    const handleClose = () => setOpen(false);
    const formRef = useRef();

    const savePart = (values) => {
        const payload = {
            code: values.code,
            name: values.name,
            price: values.price,
            quantity: values.quantity,
            photo: '',
            userId: userId
        };
        axios.post('/parts', payload).then((res) => {
            toast(res.data.message);
            socket.emit('savePart', payload);
            setOpen(false);
        });
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Adaugare piesa</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Avem nevoie de urmatoarele detalii pentru a retine piesa pe
                    care o ai.
                </DialogContentText>
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        code: '',
                        name: '',
                        price: 0,
                        quantity: 0,
                        photo: '',
                        userId: userId
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
                        // same shape as initial values
                        savePart(values);
                    }}>
                    {({ values, errors, handleChange }) => (
                        <Form>
                            <TextField
                                autoFocus
                                id="code"
                                name="code"
                                label="codul piesei"
                                value={values.code}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                                error={errors.code}
                                helperText={errors.code}
                            />
                            <TextField
                                autoFocus
                                id="name"
                                name="name"
                                label="denumire"
                                value={values.name}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                                error={errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                autoFocus
                                id="price"
                                name="price"
                                label="pret"
                                type="number"
                                value={values.price}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                id="quantity"
                                name="quantity"
                                label="quantity"
                                type="number"
                                value={values.quantity}
                                onChange={handleChange}
                                variant="standard"
                                fullWidth
                            />
                        </Form>
                    )}
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Anulare</Button>
                <Button onClick={() => formRef.current.submitForm()}>
                    Salveaza
                </Button>
            </DialogActions>
        </Dialog>
    );
};
