import React, { useState } from 'react';

import { Grid, Container, MenuItem, TextField, Button, IconButton } from '@mui/material';
import { CarRepair, DocumentScanner, EditRoad, Add } from '@mui/icons-material';


import CustomStepper from '../../../components/stepper/Stepper';
import styles from './CarProfile.module.scss'



export const CarProfile = (props) => {
    const [step, setStep] = useState(-1);
    const stepsConfig = [
        { label: 'ITP', icon: <CarRepair /> },
        { label: 'Asigurare', icon: <DocumentScanner /> },
        { label: 'Rovigneta', icon: <EditRoad /> }];


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
        <Container className={styles.pageContainer} >
            <div className={styles.header}>
                <span className={styles.title}>Masina ta, AG 77 VOB </span>
            </div>

            <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={4} sm={4} md={4} className={styles.imageElement}>
                    <img
                        src={"https://via.placeholder.com/300"}
                        alt={"to update"}
                        className={styles.img}
                        loading="lazy"
                    />
                </Grid>
                <Grid item xs={4} sm={4} md={8} className='test'>
                    <Grid container spacing={{ xs: 2, sm: 2, md: 3 }} columns={{ xs: 12, sm: 4, md: 12 }} align="center" justify="center" alignItems="center" >
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="VIN"
                                defaultValue="UU1DSJUI329JS223"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Model"
                                defaultValue="Duster"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Marca"
                                defaultValue="Dacia"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4} classes={{ item: styles.gridItem }}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Numar inmatriculare"
                                defaultValue="AG97VOB"
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
            <div className={styles.carProfile}>
                <div className={styles.stepsHeader}>
                    <Button variant="contained" onClick={prevStep}>
                        Prev
                    </Button>
                    <Button variant="contained" onClick={nextStep}>
                        Next
                    </Button>
                </div>
                <IconButton color="primary" aria-label="grid view" onClick={() => { }}><Add /></IconButton>

                <div className={styles.stepContainer}>
                    <CustomStepper currentStep={step} steps={stepsConfig} onStepClick={(item) => console.log(item)} />
                </div>
            </div>
        </Container >
    );
}

