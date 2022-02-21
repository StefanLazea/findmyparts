import React from 'react';
import { useHistory } from "react-router-dom";

import Container from '@mui/material/Container';
import { CustomCard } from './components/CustomCard';
import Grid from '@mui/material/Grid';

import "./Cars.scss";

export const Cars = (props) => {
    let history = useHistory();

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
                <Grid container rowSpacing={4} spacing={{ xs: 1, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                    {MOCK.map((car, index) =>
                        <Grid item xs={1} sm={4} md={4} key={index}>
                            <CustomCard md={12} key={car.VIN} carData={car} onClick={() => history.push("/car-profile")} />
                        </Grid >
                    )}
                </Grid>
            </Container>
        </div>
    );
}

