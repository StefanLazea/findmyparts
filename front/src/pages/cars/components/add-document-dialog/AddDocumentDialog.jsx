import React, { useState, useRef } from 'react';

import { useGoogleApi } from 'react-gapi';

import _ from 'lodash';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
    DialogActions,
    Grid,
    Radio,
    FormControlLabel,
    FormControl,
    RadioGroup,
    FormLabel,
    Fab
} from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import UploadIcon from '@mui/icons-material/Upload';
import DocumentIcon from 'assets/icons/DocumentIcon';

import { ScreenDialog } from 'components/screen-dialog/ScreenDialog.jsx';
import { DetectionDataResult } from './DetectionDataResult';

import { BACKEND_PROPERTY_VALUE } from 'constants/backend-accessors';
import { LABELS } from 'constants/labels';
import styles from './AddDocumentDialog.module.scss';

export const AddDocumentDialog = (props) => {
    //todo add carId/userId to context or redux
    const { open, setOpen, carId, reRender } = props;
    const handleClose = () => setOpen(false);
    const formRef = useRef();
    const inputRef = useRef();
    const [imgSrc, setImgSrc] = useState('');
    const [uploadedFile, setUploadFile] = useState('');
    const [type, setType] = useState(BACKEND_PROPERTY_VALUE.RCA);
    const [detectionResult, setDetectionResult] = useState({});

    const gapi = useGoogleApi({
        discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
        ],
        scopes: ['https://www.googleapis.com/auth/calendar.events']
    });

    const handleUpload = () => {
        inputRef.current?.click();
    };

    const sendToDetect = () => {
        const formData = new FormData();
        formData.append('photo', uploadedFile);
        formData.append('documentType', type);

        axios
            .post('/google/detect-image', formData)
            .then((res) => {
                if (!_.isEmpty(res.data)) {
                    setDetectionResult(res.data);
                    toast.success('Detection success', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    });
                }
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

    const handleChange = (ev) => {
        ev.preventDefault();
        const fileUploaded = ev.target.files[0];
        setImgSrc(URL.createObjectURL(fileUploaded));
        setUploadFile(fileUploaded);
    };

    const addEventToCalendar = async () => {
        console.log('here');
        const request = {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime'
        };
        console.log(gapi.client.calendar.events);
        const resp = await gapi.client.calendar.events.list(request);
        console.log(resp);
        const googleEvent = {
            summary: 'Aveti de reinoit polita RCA',
            start: {
                dateTime: '2022-06-01T16:10:00',
                timeZone: 'Etc/GMT+03:00'
            },
            end: {
                dateTime: '2022-06-01T17:00:00',
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
        console.i;
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
        }
        console.log(createEvent);
    };
    const DialogFooterComponent = () => (
        <DialogActions>
            <Fab
                variant="extended"
                size="medium"
                color="secondary"
                aria-label="add"
                disabled={_.isEmpty(detectionResult)}
                onClick={addEventToCalendar}>
                <NavigationIcon sx={{ mr: 1 }} />
                {LABELS.addToCalendar}
            </Fab>
            <Fab
                variant="extended"
                size="medium"
                color="transparent"
                aria-label="add"
                onClick={handleClose}>
                {LABELS.cancel}
            </Fab>
            <Fab
                variant="extended"
                size="medium"
                color="transparent"
                aria-label="add"
                disabled={_.isEmpty(detectionResult)}
                onClick={() => formRef.current.submitForm()}>
                {LABELS.save}
            </Fab>
        </DialogActions>
    );

    return (
        <ScreenDialog
            open={open}
            setOpen={setOpen}
            title={'Adauga un nou document'}
            description={
                'Adauga documentul tau. Incepe experienta prin alegerea tipului'
            }
            footerActions={<DialogFooterComponent />}>
            <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 3 }}
                columns={{ xs: 4, sm: 4, md: 12 }}
                className={styles.detectionContainer}
                align="center"
                justify="center"
                alignItems="center">
                <Grid item xs={8} sm={8} md={12}>
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 3, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        className={styles.uploadContainer}>
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={4}
                            className={styles.buttonsContainer}>
                            <div className={styles.uploadDocument}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">
                                        Tipul documentului
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={type}
                                        name="radio-buttons-group"
                                        onChange={(e) =>
                                            setType(e.target.value)
                                        }>
                                        <FormControlLabel
                                            value={BACKEND_PROPERTY_VALUE.RCA}
                                            control={<Radio />}
                                            label="RCA"
                                        />
                                        <FormControlLabel
                                            value={BACKEND_PROPERTY_VALUE.ITP}
                                            control={<Radio />}
                                            label="ITP"
                                        />
                                        <FormControlLabel
                                            value={
                                                BACKEND_PROPERTY_VALUE.ROVIGNETA
                                            }
                                            control={<Radio />}
                                            label="Rovigneta"
                                        />
                                    </RadioGroup>
                                </FormControl>

                                <label
                                    htmlFor="contained-button-file"
                                    className={styles.uploadButtons}>
                                    <input
                                        ref={inputRef}
                                        className={styles.uploadFile}
                                        type="file"
                                        onChange={handleChange}
                                    />
                                    {/* <Button
                                        variant="contained"
                                        component="span"
                                        Upload
                                    </Button> */}
                                    <Fab
                                        variant="extended"
                                        size="medium"
                                        color="primary"
                                        onClick={handleUpload}>
                                        <UploadIcon
                                            sx={{ mr: 1 }}
                                            classes={{
                                                root: styles.roundedButton
                                            }}
                                        />
                                    </Fab>
                                    <Fab
                                        variant="extended"
                                        size="medium"
                                        color="primary"
                                        aria-label="add"
                                        onClick={sendToDetect}>
                                        <NavigationIcon sx={{ mr: 1 }} />
                                        {LABELS.sendToDetect}
                                    </Fab>
                                </label>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            sm={4}
                            md={8}
                            className={styles.imageContainer}>
                            {imgSrc !== '' ? (
                                <img
                                    src={imgSrc}
                                    alt={'to update'}
                                    className={styles.img}
                                    loading="lazy"
                                />
                            ) : (
                                <div
                                    style={{ height: '300px', width: '300px' }}>
                                    <DocumentIcon />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} sm={8} md={12}>
                    <DetectionDataResult
                        type={type}
                        detectionData={detectionResult}
                        formRef={formRef}
                        carId={carId}
                        reRender={reRender}
                        closeScreen={handleClose}
                    />
                </Grid>
            </Grid>
        </ScreenDialog>
    );
};
