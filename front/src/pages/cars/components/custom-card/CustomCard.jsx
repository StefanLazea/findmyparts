import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import "./CustomCard.scss"

export const CustomCard = ({
    carData = {},
    ...props }
) => {
    const checkColor = (check) => check ? "info" : "error"
    return (
        <div className='custom-card' onClick={props.onClick}>
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

