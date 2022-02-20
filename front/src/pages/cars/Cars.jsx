import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { CustomCard } from './CustomCard';
import Grid from '@mui/material/Grid';

import "./Cars.scss";

export const Cars = (props) => {

    return (
        <div className='cars-page'>
            <Container>
                {/* todo spacing right incorrect */}
                <Grid container spacing={1}>
                    <CustomCard />
                    <CustomCard />
                    <CustomCard />
                </Grid>
            </Container>
        </div>
    );
}

