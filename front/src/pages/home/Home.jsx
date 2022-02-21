import React, { useRef, useState } from 'react';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import Button from '@mui/material/Button';

import CustomStepper from '../../components/stepper/Stepper'

import './Home.scss'


export const Home = (props) => {
    const inputRef = useRef();
    const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/300")
    const [, setUploadFileName] = useState("")
    const [step, setStep] = useState(-1);
    const stepsConfig = [
        { label: 'ITP', icon: <CarRepairIcon /> },
        { label: 'Asigurare', icon: <DocumentScannerIcon /> },
        { label: 'Rovigneta', icon: <EditRoadIcon /> }];

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

    const nextStep = () => {
        console.log(step, stepsConfig.length)
        if (step < stepsConfig.length - 1) {
            setStep((prev) => prev + 1);
        }
    }

    const prevStep = () => {
        if (step > -1) {
            setStep((prev) => prev - 1);
        }
    }
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

            <div className='steps-header'>
                <Button variant="contained" onClick={prevStep}>
                    Prev
                </Button>
                <Button variant="contained" onClick={nextStep}>
                    Next
                </Button>
            </div>

            <div className='step-container'>
                <CustomStepper currentStep={step} steps={stepsConfig} onStepClick={(item) => console.log(item)} />
            </div>

        </div>
    );
}

