import React, { useState, useRef } from 'react';

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

import { CustomDialog } from 'components/custom-dialog/CustomDialog';
import { DetectionDataResult } from './DetectionDataResult';

import { BACKEND_PROPERTY_VALUE } from 'constants/backend-accessors';
import { LABELS } from 'constants/labels';
import styles from './AddDocumentDialog.module.scss';
import { useEffect } from 'react';

export const AddDocumentDialog = (props) => {
    //todo add carId/userId to context or redux
    const { open, setOpen, carId, car } = props;
    const handleClose = () => setOpen(false);
    const formRef = useRef();
    const inputRef = useRef();
    const [imgSrc, setImgSrc] = useState('');
    const [uploadedFile, setUploadFile] = useState('');
    const [type, setType] = useState(BACKEND_PROPERTY_VALUE.ITP);
    const [detectionResult, setDetectionResult] = useState({});

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

    const triggerToastDisplay = () =>
        toast.info(
            `Alege un tip de document, incarca-l si apasa pe detectarea textului.
         La final, verifica corectitudinea datelor si salveaza datele. Se va seta
         automat in calendarul tau Google un nou eveniment.`,
            {
                position: 'top-right',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            }
        );

    useEffect(() => {
        triggerToastDisplay();
    }, []);

    const DialogFooterComponent = () => (
        <DialogActions>
            <Fab
                variant="extended"
                size="medium"
                aria-label="add"
                onClick={handleClose}>
                {LABELS.cancel}
            </Fab>
            <Fab
                variant="extended"
                size="medium"
                aria-label="add"
                disabled={_.isEmpty(detectionResult)}
                onClick={() => formRef.current.submitForm()}>
                {LABELS.save}
            </Fab>
        </DialogActions>
    );

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title={'Adauga un nou document'}
            description={
                'Adauga documentul tau. Incepe experienta prin alegerea tipului'
            }
            onClickInfo={() => {
                triggerToastDisplay();
            }}
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
                                            value={BACKEND_PROPERTY_VALUE.ITP}
                                            control={<Radio />}
                                            label="ITP"
                                        />
                                        <FormControlLabel
                                            value={BACKEND_PROPERTY_VALUE.RCA}
                                            control={<Radio />}
                                            label="RCA"
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
                        car={car}
                        closeScreen={handleClose}
                    />
                </Grid>
            </Grid>
        </CustomDialog>
    );
};
