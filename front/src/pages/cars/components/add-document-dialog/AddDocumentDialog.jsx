import React, { useState, useRef } from "react";
import {
    DialogActions,
    Grid,
    Radio,
    FormControlLabel,
    FormControl,
    RadioGroup,
    FormLabel,
    Button
} from "@mui/material";
import _ from 'lodash';
import axios from "axios";
import { toast } from 'react-toastify';

import { ScreenDialog } from "components/screen-dialog/ScreenDialog.jsx";
import { DetectionDataResult } from './DetectionDataResult'

import { BACKEND_PROPERTY_VALUE } from 'constants/backend-accessors'
import styles from './AddDocumentDialog.module.scss';

export const AddDocumentDialog = (props) => {
    //todo add carId/userId to context or redux
    const { open, setOpen, carId, reRender } = props;
    const handleClose = () => setOpen(false);
    const formRef = useRef();
    const inputRef = useRef();
    const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/300")
    const [uploadedFile, setUploadFile] = useState("")
    const [type, setType] = useState(BACKEND_PROPERTY_VALUE.RCA);
    const [detectionResult, setDetectionResult] = useState({})

    const handleUpload = (e) => {
        inputRef.current?.click()
    }

    const sendToDetect = (e) => {
        const formData = new FormData();
        formData.append("photo", uploadedFile)
        formData.append("documentType", "RCA")

        axios.post("/google/detect-image", formData).then((res) => {
            if (!_.isEmpty(res.data)) {
                setDetectionResult(res.data)
                toast.success("Detection success", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch((err) => {
            toast.error(
                err.response.data.message,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        })

    }

    const handleChange = (ev) => {
        ev.preventDefault();
        const fileUploaded = ev.target.files[0];
        setImgSrc(URL.createObjectURL(fileUploaded))
        setUploadFile(fileUploaded)
    }

    const DialogFooterComponent = () =>
        <DialogActions>
            <Button onClick={handleClose}>Anulare</Button>
            <Button onClick={() => formRef.current.submitForm()} disabled={_.isEmpty(detectionResult)}>Salveaza</Button>
        </DialogActions>

    return (
        <ScreenDialog
            open={open}
            setOpen={setOpen}
            title={"Adauga un nou document"}
            description={"Adauga documentul tau. Incepe experienta prin alegerea tipului"}
            footerActions={<DialogFooterComponent />}
        >
            <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 4, md: 12 }} className={styles.detectionContainer} align="center" justify="center" alignItems="center" >
                <Grid item xs={8} sm={8} md={12} >
                    <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className={styles.uploadContainer}>
                        <Grid item xs={4} sm={4} md={4} className={styles.buttonsContainer}>
                            <div className={styles.uploadDocument}>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Tipul documentului</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue={type}
                                        name="radio-buttons-group"
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <FormControlLabel value={BACKEND_PROPERTY_VALUE.RCA} control={<Radio />} label="RCA" />
                                        <FormControlLabel value={BACKEND_PROPERTY_VALUE.ITP} control={<Radio />} label="ITP" />
                                        <FormControlLabel value={BACKEND_PROPERTY_VALUE.ROVIGNETA} control={<Radio />} label="Rovigneta" />
                                    </RadioGroup>
                                </FormControl>

                                <label htmlFor="contained-button-file" className={styles.uploadButtons}>
                                    <input ref={inputRef} className={styles.uploadFile} type="file" onChange={handleChange} />
                                    <Button variant="contained" component="span" onClick={handleUpload}>
                                        Upload
                                    </Button>
                                    <Button variant="contained" component="span" onClick={sendToDetect}>
                                        Send to detect
                                    </Button>
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={4} md={8} className={styles.imageContainer}>
                            <img
                                src={imgSrc}
                                alt={"to update"}
                                className={styles.img}
                                loading="lazy"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} sm={8} md={12} >
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
        </ScreenDialog >
    );
}