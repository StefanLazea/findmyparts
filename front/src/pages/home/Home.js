import React, { useRef, useState } from 'react';
import './Home.scss'
import Button from '@mui/material/Button';
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
    return (
        <div className="home-page">
            <div className="image-view">
                {/* <img src={imgSrc} width={300} height={300} rounded /> */}
                <h1>hello</h1>
                <div className='upload-input'>
                    <input ref={inputRef} className="input" type="file" onChange={handleChange} />
                    <Button onClick={handleUpload}>Upload</Button>
                    <div className="file-label">{uploadFileName}</div>
                </div>

            </div>
        </div>
    );
}

