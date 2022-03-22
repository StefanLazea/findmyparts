import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import { Grid, Container, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

import { CustomCard } from './components/custom-card/CustomCard';

import "./Cars.scss";

export const Cars = (props) => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([])

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

    const getCars = () => {
        axios.get(`/cars`).then(response => {
            console.log(response.data);
            const mockedResponse = response.data.map(item => {
                return {
                    ...item,
                    hasITP: true,
                    hasRCA: true,
                    hasRovigneta: false
                }
            })
            setCars(mockedResponse)
        })
    }

    useEffect(() => {
        getCars();
    }, [])

    return (
        <div className='cars-page'>

            <Container>
                {/* todo spacing right incorrect */}
                <IconButton color="primary" aria-label="grid view" onClick={() => { }}><Add /></IconButton>

                <Grid container rowSpacing={4} spacing={{ xs: 1, md: 3, md: 6 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                    {cars.map((car, index) =>
                        <Grid item xs={1} sm={4} md={4} key={index}>
                            <CustomCard
                                md={12}
                                key={car.VIN}
                                carData={car}
                                onClick={() =>
                                    navigate("/car-profile", {
                                        state: { room: "test" }
                                    })
                                } />
                        </Grid >
                    )}
                </Grid>
            </Container>
        </div>
    );
}

