import React from "react"
import {
    Grid,
    TextField
} from "@mui/material";
import _ from 'lodash'
import axios from 'axios';
import { Formik } from 'formik';

import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import styles from './AddDocumentDialog.module.scss';

export const DetectionDataResult = (props) => {
    const { type, carId, detectionData, formRef } = props;

    const saveDocument = (values) => {
        console.log({ values })
        axios.post(`/documents/add/${values.name}`, values).then((res) => {
            console.log(res.data)
        })
    }

    return <Formik
        innerRef={formRef}
        enableReinitialize
        initialValues={{
            price: Number(detectionData?.price) || 0,
            fromDate: detectionData?.fromDate,
            expirationDate: detectionData?.expirationDate,
        }}
        // validationSchema={validationSchema}
        onSubmit={values => {
            const payload = { ...values, carId, name: type }
            saveDocument(payload);
        }}
    >
        {({ values, errors, handleChange, setFieldValue }) => (
            <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 3 }}
                columns={{ xs: 4, sm: 4, md: 12 }}
                className={styles.detectionContainer}
            >
                <Grid item xs={8} sm={8} md={8}>
                    <TextField
                        id="price"
                        name="price"
                        label="Pret"
                        type="number"
                        value={values?.price}
                        disabled={_.isEmpty(detectionData)}
                        onChange={handleChange}
                        classes={{ root: styles.datePickerWidth }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={8} sm={8} md={8} >
                    <LocalizationProvider dateAdapter={DateAdapter} >
                        <DatePicker
                            label="Data inceput"
                            value={values?.fromDate}
                            disabled={_.isEmpty(detectionData)}
                            onChange={(newValue) => {
                                setFieldValue('fromDate', newValue);
                            }}
                            renderInput={(params) => <TextField classes={{ root: styles.datePickerWidth }} {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={8} sm={8} md={8} >
                    <div style={{ width: '100%' }}>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <DatePicker
                                label="Data expirare"
                                value={values.expirationDate}
                                disabled={_.isEmpty(detectionData)}

                                onChange={(newValue) => {
                                    setFieldValue('expirationDate', newValue);
                                }}
                                renderInput={(params) =>
                                    <TextField classes={{ root: styles.datePickerWidth }}
                                        {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                </Grid>

            </Grid>
        )}
    </Formik>
}