import React, { useState } from 'react';

import { useGoogleApi } from 'react-gapi';
import { useGlobalContext } from 'global-context';

import _ from 'lodash';
import axios from 'axios';
import { Formik } from 'formik';
import { toast } from 'react-toastify';

import { Grid, TextField, Switch, FormControlLabel } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import styles from './AddDocumentDialog.module.scss';
import moment from 'moment';
import { LABELS } from 'constants/labels';

const ONE_DAY = 86400000;

export const DetectionDataResult = (props) => {
    const { type, carId, car, detectionData, formRef, closeScreen, edit } =
        props;
    const [enterManualData, setEnterManualData] = useState(false);
    const {
        state: { socket }
    } = useGlobalContext();

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
        axios
            .post(`/documents/add/${values.name}`, values)
            .then(() => {
                socket.emit('addNewDocument', carId);
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

    const editDocument = (values) => {
        axios
            .put(`/documents/${detectionData?.id}`, values)
            .then(() => {
                socket.emit('editNewDocument', carId);
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
            onSubmit={async (values) => {
                const eventLink = await addEventToCalendar(
                    values.fromDate,
                    values.expirationDate
                );
                const payload = {
                    ...values,
                    ...(values.fromDate === '' && {
                        fromDate: new Date().getTime()
                    }),
                    carId,
                    name: type,
                    eventLink: eventLink
                };
                if (edit) {
                    editDocument(payload);
                } else {
                    saveDocument(payload);
                }
            }}>
            {({ values, handleChange, setFieldValue }) => (
                <div>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={enterManualData}
                                onChange={() =>
                                    setEnterManualData((prev) => !prev)
                                }
                                name="data"
                            />
                        }
                        label={LABELS.manualData}
                    />
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 3, md: 3 }}
                        columns={{ xs: 4, sm: 4, md: 12 }}
                        className={styles.detectionContainer}>
                        <Grid item xs={8} sm={8} md={8}>
                            <TextField
                                id="price"
                                name="price"
                                label={LABELS.price}
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
                                    label={LABELS.beginDate}
                                    value={values?.fromDate}
                                    disabled={_.isEmpty(detectionData)}
                                    onChange={(newValue) => {
                                        setFieldValue(
                                            'fromDate',
                                            new Date(newValue).getTime()
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
                        </Grid>
                        <Grid item xs={8} sm={8} md={8}>
                            <LocalizationProvider dateAdapter={DateAdapter}>
                                <DatePicker
                                    label={LABELS.expirationDate}
                                    value={values.expirationDate}
                                    format="dd/MM/yyyy"
                                    disabled={_.isEmpty(detectionData)}
                                    onChange={(newValue) => {
                                        setFieldValue(
                                            'expirationDate',
                                            new Date(newValue).getTime()
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
                        </Grid>
                    </Grid>
                </div>
            )}
        </Formik>
    );
};
