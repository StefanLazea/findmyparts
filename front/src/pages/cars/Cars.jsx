import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { CustomCard } from './CustomCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import "./Cars.scss";

export const Cars = (props) => {
    const MOCK = [
        {
            VIN: "UUU123HFASGDA",
            numberPlate: "AG77VOB",
            brand: "Dacia",
            model: "Duster",
            //it has a more complex logic; TBD in backend
            hasITP: true,
            hasRCA: true,
            hasRovigneta: false
        },
        {
            VIN: "UUU123HFASGDA",
            numberPlate: "AG77VOB",
            brand: "Dacia",
            model: "Duster",
            //it has a more complex logic; TBD in backend
            hasITP: true,
            hasRCA: false,
            hasRovigneta: false
        },
        {
            VIN: "UUU123HFASGDA",
            numberPlate: "AG77VOB",
            brand: "Dacia",
            model: "Duster",
            //it has a more complex logic; TBD in backend
            hasITP: true,
            hasRCA: true,
            hasRovigneta: true
        },
        {
            VIN: "UUI231FDWSSDD",
            numberPlate: "AG97VOB",
            brand: "Dacia",
            model: "Duster",
            //it has a more complex logic; TBD in backend
            hasITP: false,
            hasRCA: false,
            hasRovigneta: false
        },
    ]
    return (
        <div className='cars-page'>
            <Container>
                {/* todo spacing right incorrect */}
                <Grid container spacing={1}>
                    {MOCK.map(car => <CustomCard carData={car} />)}
                </Grid>
            </Container>
        </div>
    );
}

