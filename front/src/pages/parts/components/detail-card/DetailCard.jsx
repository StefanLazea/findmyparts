import React from 'react';
import { Card, CardContent, CardHeader, Avatar, IconButton, Typography } from '@mui/material'
import styles from './DetailCard.module.scss'
export const DetailCard = ({ ...props }) => {

    return (
        <Card classes={{ root: styles.detailCard }}>
            <CardContent onClick={props.onClick}>
                <div className={styles.carsCardContent}>
                    <Typography variant="h5" component="div" className={styles.centerTypo}>
                        super
                    </Typography>


                </div>


            </CardContent>
        </Card>
    );
}