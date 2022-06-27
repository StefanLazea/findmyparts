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
    const { open, setOpen, carId, car, edit, document } = props;
    const handleClose = () => setOpen(false);
    const formRef = useRef();
    const inputRef = useRef();
    const [imgSrc, setImgSrc] = useState('');
    const [uploadedFile, setUploadFile] = useState('');
    const [type, setType] = useState(BACKEND_PROPERTY_VALUE.ITP);
    const [detectionResult, setDetectionResult] = useState({});
    const editDoc = edit
        ? {
              id: document.id,
              price: document.price,
              fromDate: document.fromDate,
              expirationDate: document.expirationDate
          }
        : {};

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
                    toast.success(LABELS.detectionSuccess, {
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
        toast.info(LABELS.chooseDocumentDescription, {
            position: 'bottom-left',
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });

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
                disabled={_.isEmpty(detectionResult) && !edit}
                onClick={() => formRef.current.submitForm()}>
                {!props.edit ? LABELS.save : LABELS.edit}
            </Fab>
        </DialogActions>
    );

    return (
        <CustomDialog
            open={open}
            setOpen={setOpen}
            title={
                props.edit
                    ? LABELS.editDocumentTitle + document.name
                    : LABELS.addDocumetTitle
            }
            description={
                props.edit
                    ? LABELS.editDocumetDescription
                    : LABELS.addDocumetDescription
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
                                        {LABELS.documentType}
                                    </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        value={
                                            props.edit && document
                                                ? document?.name
                                                : type
                                        }
                                        name="radio-buttons-group"
                                        onChange={(e) =>
                                            setType(e.target.value)
                                        }>
                                        <FormControlLabel
                                            value={BACKEND_PROPERTY_VALUE.ITP}
                                            control={<Radio />}
                                            label={LABELS.itp}
                                        />
                                        <FormControlLabel
                                            value={BACKEND_PROPERTY_VALUE.RCA}
                                            control={<Radio />}
                                            label={LABELS.rca}
                                        />
                                        <FormControlLabel
                                            value={
                                                BACKEND_PROPERTY_VALUE.ROVIGNETA
                                            }
                                            control={<Radio />}
                                            label={LABELS.rovigneta}
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
                        type={props.edit ? document?.name : type}
                        detectionData={props.edit ? editDoc : detectionResult}
                        formRef={formRef}
                        carId={carId}
                        car={car}
                        closeScreen={handleClose}
                        edit={edit}
                    />
                </Grid>
            </Grid>
        </CustomDialog>
    );
};
