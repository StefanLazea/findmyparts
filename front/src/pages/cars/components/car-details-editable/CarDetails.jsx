import React, { useState, useEffect, useRef } from 'react';

import { Grid, MenuItem, TextField, Button } from '@mui/material';

import _ from "lodash"
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import styles from './CarDetails.module.scss'
import { BACKEND_PROPERTY_VALUE } from 'constants/backend-accessors'


export const CarDetails = ({ selectedCar, ...props }) => {
    console.log(selectedCar)
    const [disableFields, setDisableFields] = useState(false);
    const formRef = useRef();

    useEffect(() => {
        setDisableFields(props.editMode)
    }, [props.editMode])

    const updateCar = () => {

    }
    return (

        <Formik
            innerRef={formRef}
            initialValues={{
                numberPlate: selectedCar.numberPlate,
                brand: selectedCar.brand,
                model: selectedCar.model,
                type: selectedCar.type,
                VIN: selectedCar.VIN,
                // fuel: selectedCar.brand,
                isHistoric: selectedCar.isEco,
                isElectric: selectedCar.isHistoric
            }}
            // validationSchema={validationSchema}
            onSubmit={values => {
                updateCar(values);
            }}
        >
            {({ values, errors, handleChange, setFieldValue }) => (
                <Form>
                    <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={4} sm={4} md={4} className={styles.imageElement}>
                            <img
                                src={_.get(values, "selectedCar.image", "https://via.placeholder.com/300")}
                                alt={"to update"}
                                className={styles.img}
                                loading="lazy"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4} md={8}>
                            <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 12, sm: 4, md: 12 }} align="center" justify="center" alignItems="center" >
                                <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                                    <TextField
                                        disabled={disableFields}
                                        id="outlined-disabled"
                                        label="VIN"
                                        defaultValue={_.get(values, "VIN", "-")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                                    <TextField
                                        disabled={disableFields}
                                        id="outlined-disabled"
                                        label="Model"
                                        defaultValue={_.get(values, "model", "-")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                                    <TextField
                                        disabled={disableFields}
                                        id="outlined-disabled"
                                        label="Marca"
                                        defaultValue={_.get(values, "brand", "-")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                                    <TextField
                                        disabled={disableFields}
                                        id="outlined-disabled"
                                        label="Numar inmatriculare"
                                        defaultValue={_.get(values, "numberPlate", "-")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                                    <TextField
                                        value={"test"}
                                        onChange={(e) => { }}
                                        select // tell TextField to render select
                                        label="Caroserie"
                                        disabled={disableFields}
                                        classes={{ root: styles.formControl }}
                                    >
                                        {BACKEND_PROPERTY_VALUE.BODY_STYLE_VARIANTS.map((item, index) =>
                                            <MenuItem key={index} value={item}>
                                                {item}
                                            </MenuItem>
                                        )}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                                    <TextField
                                        value={"test"}
                                        onChange={(e) => { }}
                                        select // tell TextField to render select
                                        label="Combustibil"
                                        disabled={disableFields}
                                        classes={{ root: styles.formControl }}
                                    >
                                        <MenuItem key={1} value="test">
                                            Test 1
                                        </MenuItem>
                                        <MenuItem key={2} value="test2">
                                            Test 2
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                {
                                    !disableFields &&
                                    <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                                        <Button variant="contained" component="span" onClick={() => { }}>
                                            Send to detect
                                        </Button>
                                    </Grid>
                                }

                            </Grid>

                        </Grid>
                    </Grid>

                </Form>

            )
            }
        </Formik >


    );
}

