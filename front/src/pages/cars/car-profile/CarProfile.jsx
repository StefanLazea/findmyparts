import React, { useState } from 'react';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import Button from '@mui/material/Button';

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
                <span>Masina ta, AG 77 VOB </span>
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

                <div className={styles.stepContainer}>
                    <CustomStepper currentStep={step} steps={stepsConfig} onStepClick={(item) => console.log(item)} />
                </div>
            </div>
        </div>
    );
}

