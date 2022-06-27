import React from 'react';

import {
    Card,
    CardContent,
    CardHeader,
    Avatar,
    IconButton,
    Typography
} from '@mui/material';
import { red } from '@mui/material/colors';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { LABELS } from 'constants/labels';

import styles from './CustomCard.module.scss';

export const CustomCard = ({ carData = {}, ...props }) => {
    const checkColor = (check) => (check ? 'info' : 'error');
    return (
        <div className={styles.customCard}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {carData?.numberPlate.split('-')[0] || 'M'}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            aria-label="settings"
                            onClick={() => props.onDelete(carData.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }
                    title={carData.VIN}
                    subheader={`${carData.brand} ${carData.model}`}
                />
                <CardContent
                    onClick={props.onClick}
                    classes={{ root: styles.customContent }}>
                    <div className={styles.carsCardContent}>
                        <Typography
                            variant="h5"
                            component="div"
                            className={styles.centerTypo}>
                            {carData.numberPlate}
                        </Typography>

                        <div className={styles.check}>
                            <CheckCircleIcon
                                color={checkColor(carData.hasITP)}
                            />
                            {LABELS.itp.toUpperCase()}
                        </div>
                        <div className={styles.check}>
                            <CheckCircleIcon
                                color={checkColor(carData.hasRCA)}
                            />
                            {LABELS.rca.toUpperCase()}
                        </div>
                        <div className={styles.check}>
                            <CheckCircleIcon
                                color={checkColor(carData.hasRovigneta)}
                            />
                            {LABELS.rovigneta}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
