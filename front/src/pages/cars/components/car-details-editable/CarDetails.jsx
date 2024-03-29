import React, { useState, useEffect, useRef } from 'react';

import { useGlobalContext } from 'global-context';

import { Grid, MenuItem, TextField, Button } from '@mui/material';
import CarIcon from 'assets/icons/CarIcon';

import _ from 'lodash';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

import { BACKEND_PROPERTY_VALUE } from 'constants/backend-accessors';
import { LABELS } from 'constants/labels';
import styles from './CarDetails.module.scss';

export const CarDetails = ({ carData, ...props }) => {
    const {
        state: { socket }
    } = useGlobalContext();
    const [disableFields, setDisableFields] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        setDisableFields(!props.editMode);
    }, [props.editMode]);

    const updateCar = (values) => {
        axios.put(`/cars/${carData.id}`, values).then(() => {
            socket.emit('updateCar', carData.id);
            toast.success(LABELS.carUpdated, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            setDisableFields(true);
        });
    };
    return (
        <Formik
            innerRef={formRef}
            initialValues={{
                numberPlate: carData.numberPlate,
                brand: carData.brand,
                model: carData.model,
                type: carData.type,
                VIN: carData.VIN,
                fuel: 'benzina',
                isHistoric: carData.isEco,
                isElectric: carData.isHistoric
            }}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
                updateCar(values);
            }}>
            {({ values, handleChange, setFieldValue }) => (
                <Form>
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 3, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        className={styles.gridContainer}>
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            align="center"
                            justify="center"
                            alignItems="center"
                            className={styles.imageElement}>
                            <CarIcon />
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={8}
                            className={styles.itemContainer}>
                            <Grid
                                container
                                spacing={{ xs: 2, sm: 2, md: 3 }}
                                columns={{ xs: 12, sm: 4, md: 12 }}
                                align="center"
                                justify="center"
                                alignItems="center"
                                className={styles.gridContainer}>
                                <Grid
                                    item
                                    xs={12}
                                    sm={8}
                                    md={4}
                                    classes={{ item: styles.gridItem }}>
                                    <TextField
                                        disabled={disableFields}
                                        id="VIN"
                                        name="VIN"
                                        label="VIN"
                                        onChange={handleChange}
                                        defaultValue={_.get(values, 'VIN', '-')}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={8}
                                    md={4}
                                    classes={{ item: styles.gridItem }}>
                                    <TextField
                                        disabled={disableFields}
                                        id="model"
                                        name="model"
                                        label="Model"
                                        onChange={handleChange}
                                        defaultValue={_.get(
                                            values,
                                            'model',
                                            '-'
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={8}
                                    md={4}
                                    classes={{ item: styles.gridItem }}>
                                    <TextField
                                        disabled={disableFields}
                                        id="brand"
                                        name="brand"
                                        label="Marca"
                                        onChange={handleChange}
                                        defaultValue={_.get(
                                            values,
                                            'brand',
                                            '-'
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={8}
                                    md={4}
                                    classes={{ item: styles.gridItem }}>
                                    <TextField
                                        disabled={disableFields}
                                        id="numberPlate"
                                        name="numberPlate"
                                        label="Numar inmatriculare"
                                        onChange={handleChange}
                                        defaultValue={_.get(
                                            values,
                                            'numberPlate',
                                            '-'
                                        )}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={8}
                                    md={4}
                                    classes={{ item: styles.gridItem }}>
                                    <TextField
                                        id="type"
                                        name="type"
                                        value={values.type}
                                        onChange={(e) =>
                                            setFieldValue(
                                                'type',
                                                e.target.value
                                            )
                                        }
                                        select // tell TextField to render select
                                        label="Caroserie"
                                        disabled={disableFields}
                                        classes={{ root: styles.formControl }}>
                                        {BACKEND_PROPERTY_VALUE.BODY_STYLE_VARIANTS.map(
                                            (item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={item}>
                                                    {item}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={8}
                                    md={4}
                                    classes={{ item: styles.gridItem }}>
                                    <TextField
                                        key="fuel"
                                        id="fuel"
                                        name="fuel"
                                        value={values.fuel}
                                        onChange={(e) =>
                                            setFieldValue(
                                                'fuel',
                                                e.target.value
                                            )
                                        }
                                        select // tell TextField to render select
                                        label="Combustibil"
                                        disabled={disableFields}
                                        classes={{ root: styles.formControl }}>
                                        {BACKEND_PROPERTY_VALUE.FUEL_VARIANTS.map(
                                            (item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={item}>
                                                    {item}
                                                </MenuItem>
                                            )
                                        )}
                                    </TextField>
                                </Grid>
                                {!disableFields && (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={8}
                                        md={4}
                                        classes={{ item: styles.gridItem }}>
                                        <Button
                                            variant="contained"
                                            component="span"
                                            onClick={() => {
                                                formRef.current.submitForm();
                                            }}>
                                            {LABELS.update}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};
