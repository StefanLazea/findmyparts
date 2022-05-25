import React, { useEffect, useRef, useState } from "react";

import { useGlobalContext } from '../../../../global-context';

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"

// import * as yup from 'yup';
import { Formik, Form } from 'formik';
import _ from 'lodash'
import axios from "axios";


export const EditPartDialog = (props) => {
    const { part, open, setOpen } = props;
    const { state: { userId, socket } } = useGlobalContext();
    const formRef = useRef();
    const [selectedPart, setSelectedPart] = useState({});

    useEffect(() => {
        if (!_.isEmpty(part)) {
            const userStock = part.stocks.filter(item => item.userId === userId);
            console.log(userStock)
            setSelectedPart(prev => {
                return {
                    ...prev,
                    ...{
                        name: part.name,
                        code: part.code,
                        id: part.id,
                        quantity: _.get(userStock, '[0].quantity', 0),
                        price: _.get(userStock, '[0].price', 0)
                    }
                }
            })
            console.log({
                name: part.name,
                code: part.code,
                id: part.id,
                quantity: _.get(userStock, '[0].quantity', 0),
                price: _.get(userStock, '[0].price', 0)
            })
        }

    }, [part])

    const handleClose = () => setOpen(false);
    const savePart = (values) => {
        const payload = {
            code: values.code,
            name: values.name,
            price: values.price,
            quantity: values.quantity,
            photo: "",
            userId: userId

        }
        axios.put(`/parts/${part.id}`, payload).then(res => {
            setOpen(false);
            socket.emit("updatePart", { code: '123' });

        })
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editare piesa</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Avem nevoie de urmatoarele detalii pentru a modifica piesa pe care o ai.
                </DialogContentText>
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        code: selectedPart.code,
                        name: selectedPart.name,
                        price: selectedPart.price,
                        quantity: selectedPart.quantity,
                        photo: "",
                        userId: userId
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={values => {
                        savePart(values);
                    }}
                >
                    {({ values, errors, handleChange, setFieldValue }) => (
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
                <Button onClick={() => formRef.current.submitForm()}>Salveaza</Button>

            </DialogActions>
        </Dialog>
    );
}