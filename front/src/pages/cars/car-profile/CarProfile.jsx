import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { Grid, MenuItem, TextField, IconButton } from '@mui/material';
import { CarRepair, DocumentScanner, EditRoad, Add } from '@mui/icons-material';
import _ from "lodash"
import axios from "axios"

import CustomStepper from '../../../components/stepper/Stepper';
import styles from './CarProfile.module.scss'
import { AddDocumentDialog } from '../components/add-document-dialog/AddDocumentDialog';
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

    return (
        <PageContainer>
            <div className={styles.header}>
                <span className={styles.title}>Masina ta, AG 77 VOB </span>
            </div>

            <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4} sm={4} md={4} className={styles.imageElement}>
                    <img
                        src={_.get(state, "selectedCar.image", "https://via.placeholder.com/300")}
                        alt={"to update"}
                        className={styles.img}
                        loading="lazy"
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={8}>
                    <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 12, sm: 4, md: 12 }} align="center" justify="center" alignItems="center" >
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="VIN"
                                defaultValue={_.get(state, "selectedCar.VIN", "-")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Model"
                                defaultValue={_.get(state, "selectedCar.model", "-")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Marca"
                                defaultValue={_.get(state, "selectedCar.brand", "-")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Numar inmatriculare"
                                defaultValue={_.get(state, "selectedCar.numberPlate", "-")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                value={"test"}
                                onChange={(e) => { }}
                                select // tell TextField to render select
                                label="Caroserie"
                                disabled
                                classes={{ root: styles.formControl }}
                            >
                                <MenuItem key={1} value="test">
                                    Test 1
                                </MenuItem>
                                <MenuItem key={2} value="test2">
                                    Test 2
                                </MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                value={"test"}
                                onChange={(e) => { }}
                                select // tell TextField to render select
                                label="Combustibil"
                                disabled
                                classes={{ root: styles.formControl }}
                            >
                                <MenuItem key={1} value="test">
                                    Test 1
                                </MenuItem>
                                <MenuItem key={2} value="test2">
                                    Test 2
                                </MenuItem>
                            </TextField>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
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

