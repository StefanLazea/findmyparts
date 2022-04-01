import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';

import {
    DialogActions,
} from "@mui/material"
import styles from './AddDocumentDialog.module.scss'
import _ from 'lodash'
import axios from "axios";
import { ScreenDialog } from "../../../../components/screen-dialog/ScreenDialog.jsx";


export const AddDocumentDialog = (props) => {
    const { open, setOpen, reRender } = props;
    const handleClose = () => setOpen(false);
    const formRef = useRef();
    const inputRef = useRef();
    const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/300")
    const [uploadedFile, setUploadFile] = useState("")
    const [detectResult, setDetectResult] = useState({})

    const handleUpload = (e) => {
        inputRef.current?.click()
    }

    const sendToDetect = (e) => {
        const formData = new FormData();
        formData.append("photo", uploadedFile)
        formData.append("documentType", "RCA")

        axios.post("/google/detect-image", formData).then((res) => {
            if (!_.isEmpty(res.data)) {
                console.log("here")
            }
            console.log(res)
            setDetectResult(res.data)
        })

    }

    const handleChange = (ev) => {
        ev.preventDefault();
        const fileUploaded = ev.target.files[0];
        setImgSrc(URL.createObjectURL(fileUploaded))
        setUploadFile(fileUploaded)
    }
    const saveDocument = (values) => {
        console.log(values)
    }

    const DialogFooterComponent = () =>
        <DialogActions>
            <Button onClick={handleClose}>Anulare</Button>
            <Button onClick={() => formRef.current.submitForm()}>Salveaza</Button>
        </DialogActions>

    return (
        <ScreenDialog
            open={open}
            setOpen={setOpen}
            title={"Adauga un nou document"}
            description={"Adauga documentul tau. Incepe experienta prin alegerea tipului"}
            footerActions={<DialogFooterComponent />}
        >
            <div className={styles.addDocument}>
                <div className={styles.uploadInput}>
                    <img
                        src={imgSrc}
                        alt={"to update"}
                        className={styles.img}
                        loading="lazy"
                    />
                    <label htmlFor="contained-button-file">
                        <input ref={inputRef} className={styles.uploadFile} type="file" onChange={handleChange} />
                        <Button variant="contained" component="span" onClick={handleUpload}>
                            Upload
                        </Button>
                        <Button variant="contained" component="span" onClick={sendToDetect}>
                            Send to detect
                        </Button>
                    </label>
                </div>
            </div>

        </ScreenDialog >
    );
}