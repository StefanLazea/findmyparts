import React from 'react';

import { Card, CardContent, Typography } from '@mui/material'

import styles from './SummaryCard.module.scss'

export const SummaryCard = ({ ...props }) => {

    return (
        <Card classes={{ root: styles.summaryCard }}>
            <CardContent onClick={props.onClick}>
                <div className={styles.summaryCardContent}>
                    <Typography component="div" className={`${styles.title} ${styles.text}`}>
                        Pretul mediu
                    </Typography>
                    <Typography component="div" className={styles.text}>
                        100 lei
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}