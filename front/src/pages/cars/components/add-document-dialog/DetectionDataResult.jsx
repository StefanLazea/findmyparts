import React from 'react';

import { useGoogleApi } from 'react-gapi';

import _ from 'lodash';
import axios from 'axios';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import { Grid, TextField } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import styles from './AddDocumentDialog.module.scss';
import moment from 'moment';

const ONE_DAY = 86400000;

export const DetectionDataResult = (props) => {
    const { type, carId, car, detectionData, formRef, closeScreen } = props;

    const gapi = useGoogleApi({
        discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
        ],
        scopes: [
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/calendar'
        ]
    });
    const addEventToCalendar = async (fromDate, expDate) => {
        console.log(fromDate, expDate);
        const request = {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime'
        };
        const resp = await gapi.client.calendar.events.list(request);
        console.log(resp);
        // console.log(resp);
        const googleEvent = {
            summary: `gasestePiesa.online: ${car.numberPlate} Aveti de reinnoit ${type}`,
            start: {
                dateTime: moment(expDate).format(),
                timeZone: 'Etc/GMT+03:00'
            },
            end: {
                dateTime: moment(expDate + ONE_DAY).format(),
                timeZone: 'Etc/GMT+03:00'
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 },
                    { method: 'email', minutes: 24 * 60 * 7 },
                    { method: 'email', minutes: 10 },
                    { method: 'popup', minutes: 10 }
                ]
            }
        };
        const createEvent = await gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: googleEvent
        });
        if (!_.isNil(createEvent) && _.get(createEvent, 'status') === 200) {
            console.log(createEvent);
            toast.success('Ati adaugat un eveniment nou!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            return _.get(createEvent, 'result.htmlLink');
        }
        return '';
    };

    const saveDocument = (values) => {
        console.log({ values });
        axios
            .post(`/documents/add/${values.name}`, values)
            .then((res) => {
                console.log(res.data);
                closeScreen();
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
    };

    return (
        <Formik
            innerRef={formRef}
            enableReinitialize
            initialValues={{
                price: Number(detectionData?.price) || 0,
                fromDate: detectionData?.fromDate,
                expirationDate: detectionData?.expirationDate
            }}
            // validationSchema={validationSchema}
            onSubmit={async (values) => {
                const eventLink = await addEventToCalendar(
                    values.fromDate,
                    values.expirationDate
                );
                //TODO get link from above and add to document model
                const payload = {
                    ...values,
                    ...(values.fromDate === '' && {
                        fromDate: new Date().getTime()
                    }),
                    carId,
                    name: type,
                    eventLink: eventLink
                };
                saveDocument(payload);
            }}>
            {({ values, handleChange, setFieldValue }) => (
                <Grid
                    container
                    spacing={{ xs: 2, sm: 3, md: 3 }}
                    columns={{ xs: 4, sm: 4, md: 12 }}
                    className={styles.detectionContainer}>
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
                    <Grid item xs={8} sm={8} md={8}>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DatePicker
                                label="Data inceput"
                                value={values?.fromDate}
                                disabled={_.isEmpty(detectionData)}
                                onChange={(newValue) => {
                                    setFieldValue('fromDate', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        classes={{
                                            root: styles.datePickerWidth
                                        }}
                                        {...params}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                        <div style={{ width: '100%' }}>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    label="Data expirare"
                                    value={values.expirationDate}
                                    format="dd/MM/yyyy"
                                    disabled={_.isEmpty(detectionData)}
                                    onChange={(newValue) => {
                                        setFieldValue(
                                            'expirationDate',
                                            newValue
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            classes={{
                                                root: styles.datePickerWidth
                                            }}
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </div>
                    </Grid>
                </Grid>
            )}
        </Formik>
    );
};
