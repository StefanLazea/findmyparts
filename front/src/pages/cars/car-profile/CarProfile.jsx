import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { Grid, IconButton } from '@mui/material';
import { CarRepair, DocumentScanner, EditRoad, Add } from '@mui/icons-material';
import _ from "lodash"
import axios from "axios"

import CustomStepper from '../../../components/stepper/Stepper';
import styles from './CarProfile.module.scss'
import { AddDocumentDialog } from '../components/add-document-dialog/AddDocumentDialog';
import { CarDetails } from '../components/car-details-editable/CarDetails'
import { PageContainer } from '../../../components/page-container/PageContainer'

export const CarProfile = (props) => {
    const [step, setStep] = useState(-1);
    const [documents, setDocuments] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [triggerRender, setTriggerRender] = useState(false);
    const { state } = useLocation();
    const stepsConfig = [
        { label: 'ITP', icon: <CarRepair /> },
        { label: 'RCA', icon: <DocumentScanner /> },
        { label: 'Rovigneta', icon: <EditRoad /> }];


    useEffect(() => {
        axios.get(`/documents/car/${state?.selectedCar?.id}`).then((res) => {
            const response = res.data;
            const isRcaAvailable = response.some(item => item.name === "RCA" && !item.isExpired)
            const isITPAvailable = response.some(item => item.name === "ITP" && !item.isExpired)
            const isRovAvailable = response.some(item => item.name === "ROVIGNETA" && !item.isExpired)
            //refactor
            if (isITPAvailable) {
                setStep((prev) => { console.log("prev", prev); return prev + 1 })
                if (isRcaAvailable) {
                    setStep((prev) => prev + 1)
                    if (isRovAvailable) {
                        console.log('here')
                        setStep((prev) => prev + 1)
                    }
                }
            }
            setDocuments(prev => { return { ...prev, ...{ isRcaAvailable, isITPAvailable, isRovAvailable } } })
        })
        return () => setStep(-1);

    }, [triggerRender]);
    console.log(state)

    return (
        <PageContainer>
            <div className={styles.header}>
                <span className={styles.title}>Masina ta, {state.selectedCar?.numberPlate}</span>
            </div>


            <CarDetails carDetails={state} />
            <div className={styles.carProfileStepper}>
                <IconButton color="primary" aria-label="grid view" onClick={() => setModalOpen(true)}><Add /></IconButton>
                <div className={styles.stepContainer}>
                    <CustomStepper currentStep={step} steps={stepsConfig} onStepClick={(item) => console.log(item)} />
                </div>
            </div>

            {isModalOpen &&
                <AddDocumentDialog
                    open={isModalOpen}
                    setOpen={setModalOpen}
                    reRender={() => setTriggerRender(prev => !prev)}
                    carId={state?.selectedCar?.id}
                />}

        </PageContainer>
    );
}

