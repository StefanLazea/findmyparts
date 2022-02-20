import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import "./CustomCard.scss"

export const CustomCard = (props) => {

    return (
        <Card sx={{ minWidth: 350, maxHeight: 400 }}>
            <CardContent>
                <div className='cars-card-content'>
                    <Typography variant="h5" component="div">
                        UUID132JDAI1982
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        AG77VOB
                    </Typography>
                    <Typography sx={{ mb: 1.2 }} color="text.secondary">
                        Dacia Duster
                    </Typography>
                    <div className='check'>
                        <CheckCircleIcon color="info" />
                        ITP
                    </div>
                    <div className='check'>
                        <CheckCircleIcon color="warning" />
                        RCA
                    </div>
                    <div className='check'>
                        <CheckCircleIcon color="error" />
                        Rovigneta
                    </div>
                </div>


            </CardContent>
        </Card>
    );
}

