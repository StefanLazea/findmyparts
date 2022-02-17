import React, { useRef, useState } from 'react';
import _ from "lodash";

import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

import CustomStepper from '../../components/stepper/Stepper'

import './Home.scss'


export const Home = (props) => {
    const inputRef = useRef();
    const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/300")
    const [uploadFileName, setUploadFileName] = useState("")
    const [step, setStep] = useState(0);
    const steps = ['Asigurare', 'Rovigneta', 'ITP'];


    const handleUpload = (e) => {
        console.log(e)
        inputRef.current?.click()
    }

    const handleChange = (ev) => {
        const fileUploaded = ev.target.files[0];
        setUploadFileName(fileUploaded.name)
        setImgSrc(URL.createObjectURL(fileUploaded))
        console.log(fileUploaded)
    }
    /** */
    return (
        <div className="home-page">
            <img
                src={imgSrc}
                alt={"to update"}
                className='img'
                loading="lazy"
            />
            <label htmlFor="contained-button-file">
                <input ref={inputRef} className="upload-file" type="file" onChange={handleChange} />
                <Button variant="contained" component="span" onClick={handleUpload}>
                    Upload
                </Button>
            </label>
            <CustomStepper currentStep={step} steps={steps} />

        </div>
    );
}

