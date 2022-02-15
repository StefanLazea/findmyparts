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
    const handleUpload = () => {
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
                <Input accept="image/*" className="upload-file" multiple type="file" />
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label>
            <CustomStepper />

        </div>
    );
}

