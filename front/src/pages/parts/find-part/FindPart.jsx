import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './FindPart.scss';

export const FindPart = (props) => {
    const inputRef = useRef();
    const [imgSrc, setImgSrc] = useState("https://via.placeholder.com/300")
    const [, setUploadFileName] = useState("")

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
    return (
        <Container maxWidth="lg">
            <div className="find-part">
                <div className="upload-input">
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
                </div>
                <div>
                    <span>Am gasit in poza:</span>
                </div>
            </div>
        </Container>

    );
}

