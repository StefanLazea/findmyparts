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

import styles from './ProfileCard.module.scss';

export const ProfileCard = ({ carData = {}, ...props }) => {
    return (
        <Card classes={{ root: styles.profileCard }}>
            {/* <CardHeader
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
                /> */}
            <CardContent
                onClick={() => {}}
                classes={{ root: styles.customContent }}>
                <div className={styles.carsCardContent}>test</div>
            </CardContent>
        </Card>
    );
};
