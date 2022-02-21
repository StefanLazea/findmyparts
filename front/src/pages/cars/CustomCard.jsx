import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import "./CustomCard.scss"

export const CustomCard = ({
    carData = {},
    ...props }
) => {
    const checkColor = (check) => check ? "info" : "error"
    return (
        <div className='custom-card'>
            <Card>
                <CardContent>
                    <div className='cars-card-content'>
                        <Typography variant="h5" component="div" className='center-typo'>
                            {carData.VIN}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary" className='center-typo '>
                            {carData.numberPlate}
                        </Typography>
                        <Typography sx={{ mb: 1.2 }} color="text.secondary" className='center-typo '>
                            {carData.brand} {carData.model}
                        </Typography>
                        <div className='check'>
                            <CheckCircleIcon color={checkColor(carData.hasITP)} />
                            ITP
                        </div>
                        <div className='check'>
                            <CheckCircleIcon color={checkColor(carData.hasRCA)} />
                            RCA
                        </div>
                        <div className='check'>
                            <CheckCircleIcon color={checkColor(carData.hasRovigneta)} />
                            Rovigneta
                        </div>
                    </div>


                </CardContent>
            </Card>
        </div>
    );
}

