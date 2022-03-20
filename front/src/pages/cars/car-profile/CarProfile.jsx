import React, { useState } from 'react';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

//TODO imports refactoring
import CustomStepper from '../../../components/stepper/Stepper';
import styles from './CarProfile.module.scss'
import { Box, Container, FormControl, Select, MenuItem, InputLabel } from '@mui/material';


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
                        <Grid item xs={12} sm={8} md={4}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="VIN"
                                defaultValue="UU1DSJUI329JS223"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Model"
                                defaultValue="Duster"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Marca"
                                defaultValue="Dacia"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <TextField
                                disabled
                                id="outlined-disabled"
                                label="Numar inmatriculare"
                                defaultValue="AG97VOB"
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} md={4}>
                            <FormControl classes={styles.typeControl}>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="type"
                                    id="car-type"
                                    value={10}
                                    label="Age"
                                    disabled={true}
                                    onChange={() => { }}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

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
                <IconButton color="primary" aria-label="grid view" onClick={() => { }}><AddIcon /></IconButton>

                <div className={styles.stepContainer}>
                    <CustomStepper currentStep={step} steps={stepsConfig} onStepClick={(item) => console.log(item)} />
                </div>
            </div>
        </Container >
    );
}

