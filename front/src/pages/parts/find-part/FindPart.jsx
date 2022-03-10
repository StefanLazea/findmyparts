import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from "axios"
import _ from "lodash"
import styles from './FindPart.module.scss';

export const FindPart = (props) => {
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
        formData.append("documentType", "rca")

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

    return (
        <Container maxWidth="lg">
            <div className={styles.findPart}>
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
                <div>
                    <span>Am gasit in poza:</span>
                    {detectResult &&
                        <div className={styles.detectionContainer}>
                            <span>{detectResult.fromDate}</span>
                            <span>{detectResult.endDate}</span>
                            <span>{detectResult.price}</span>
                        </div>

                    }
                </div>
            </div>
        </Container>

    );
}

