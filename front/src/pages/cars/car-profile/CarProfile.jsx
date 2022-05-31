import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useGlobalContext } from "global-context"

import axios from "axios"

import { IconButton } from '@mui/material';
import { CarRepair, DocumentScanner, EditRoad, Add } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

import CustomStepper from 'components/stepper/Stepper';
import { AddDocumentDialog } from '../components/add-document-dialog/AddDocumentDialog';
import { CarDetails } from '../components/car-details-editable/CarDetails'
import { PageContainer } from 'components/page-container/PageContainer'

import styles from './CarProfile.module.scss'

export const CarProfile = ({ ...props }) => {
    const { state } = useLocation();
    const { state: { socket } } = useGlobalContext();

    console.log(props)
    const [step, setStep] = useState(-1);
    const [_, setDocuments] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [triggerRender, setTriggerRender] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const [selectedCar, setSelectedCar] = useState(state?.selectedCar);

    const stepsConfig = [
        { label: 'ITP', icon: <CarRepair />, expired: true, tooltipData: { expirationData: '27/10/2022', startDate: '26/10/2021' } },
        { label: 'RCA', icon: <DocumentScanner />, expired: false },
        { label: 'Rovigneta', icon: <EditRoad />, expired: false }];

    useEffect(() => {
        const handler = (car) => {
            console.log('client side am primit', car)
            setSelectedCar(car)
        }
        socket.on('carUpdated', handler)

    }, [socket])

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

    useEffect(() => {
        getCarDetails();
    }, [state?.selectedCar?.id])

    const getCarDetails = () => {
        axios.get(`/cars/${state?.selectedCar?.id}`).then((res) => {
            console.log(res)
            setSelectedCar(res.data)
        })
    }
    return (
        <PageContainer>
            <div className={styles.header}>
                <span className={styles.title}>Masina ta, {selectedCar?.numberPlate}</span>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => { }}
                    aria-label="close"
                    onClick={() => setEditMode(prev => !prev)}
                >
                    <EditIcon />
                </IconButton>
            </div>


            <CarDetails carData={selectedCar} editMode={editMode} setEditMode={setEditMode} />
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

