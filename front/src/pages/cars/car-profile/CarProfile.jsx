import React, { useState } from 'react';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

//TODO imports refactoring
import CustomStepper from '../../../components/stepper/Stepper';
import styles from './CarProfile.module.scss'


export const CarProfile = (props) => {
    const [step, setStep] = useState(-1);
    const stepsConfig = [
        { label: 'ITP', icon: <CarRepairIcon /> },
        { label: 'Asigurare', icon: <DocumentScannerIcon /> },
        { label: 'Rovigneta', icon: <EditRoadIcon /> }];


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
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <span className={styles.title}>Masina ta, AG 77 VOB </span>
            </div>

            <div className={styles.carDetails}>
                <img
                    src={"https://via.placeholder.com/300"}
                    alt={"to update"}
                    className={styles.img}
                    loading="lazy"
                />
                <div className={styles.info}>

                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="VIN"
                        defaultValue="UU1DSJUI329JS223"
                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="VIN"
                        defaultValue="UU1DSJUI329JS223"
                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="VIN"
                        defaultValue="UU1DSJUI329JS223"
                    />
                </div>

            </div>
            <div className={styles.carProfile}>
                <div className={styles.stepsHeader}>
                    <Button variant="contained" onClick={prevStep}>
                        Prev
                    </Button>
                    <Button variant="contained" onClick={nextStep}>
                        Next
                    </Button>
                </div>
                <IconButton color="primary" aria-label="grid view" onClick={() => { }}><AddIcon /></IconButton>

                <div className={styles.stepContainer}>
                    <CustomStepper currentStep={step} steps={stepsConfig} onStepClick={(item) => console.log(item)} />
                </div>
            </div>
        </div>
    );
}

