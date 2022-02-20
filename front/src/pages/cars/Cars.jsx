import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { CustomCard } from './CustomCard';

import "./Cars.scss";

export const Cars = (props) => {

    return (
        <Container maxWidth="lg" >
            <div className='cars-page'>
                <CustomCard />
                <CustomCard />
                <CustomCard />
            </div>
            {/* add grid or flex when mapping through the cars */}

        </Container>
    );
}

