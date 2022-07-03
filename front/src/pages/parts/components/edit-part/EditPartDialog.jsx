import React, { useEffect, useRef, useState } from 'react';

import { useGlobalContext } from 'global-context';

import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

// import * as yup from 'yup';
import { Formik, Form } from 'formik';
import _ from 'lodash';
import axios from 'axios';
import { LABELS } from 'constants/labels';

export const EditPartDialog = (props) => {
    const { part, open, setOpen } = props;
    const {
        state: { userId, socket }
    } = useGlobalContext();
    const formRef = useRef();
    const [selectedPart, setSelectedPart] = useState({});
    useEffect(() => {
        if (!_.isEmpty(part)) {
            const userStock = part.stocks?.filter(
                (item) => item.userId === userId
            );
            setSelectedPart((prev) => {
                return {
                    ...prev,
                    ...{
                        name: part.name,
                        code: part.code,
                        id: part.id,
                        quantity: _.get(userStock, '[0].quantity', 0),
                        price: _.get(userStock, '[0].price', 0)
                    }
                };
            });
        }
    }, [part]);

    const handleClose = () => setOpen(false);
    const savePart = (values) => {
        const payload = {
            code: values.code,
            name: values.name,
            price: values.price,
            quantity: values.quantity,
            photo: '',
            userId: userId
        };
        axios.put(`/parts/${part.id}`, payload).then(() => {
            setOpen(false);
            if (props.oneUserDisplay) {
                socket.emit('updatePart', part.id, userId);
            } else {
                socket.emit('updatePart', part.id);
            }
        });
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{LABELS.updatePart}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {LABELS.updatePartDescription}
                </DialogContentText>
                <Formik
                    innerRef={formRef}
                    initialValues={{
                        code: selectedPart.code,
                        name: selectedPart.name,
                        price: selectedPart.price,
                        quantity: selectedPart.quantity,
                        photo: '',
                        userId: userId
                    }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => {
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
                <Button onClick={handleClose}>{LABELS.cancel}</Button>
                <Button onClick={() => formRef.current.submitForm()}>
                    {LABELS.save}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
