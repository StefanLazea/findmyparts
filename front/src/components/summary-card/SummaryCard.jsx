import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import styles from './SummaryCard.module.scss';

const SummaryCard = ({ data, ...props }) => {
    return (
        <Card classes={{ root: styles.summaryCard }}>
            <CardContent onClick={props.onClick}>
                <div className={styles.summaryCardContent}>
                    <Typography
                        component="div"
                        className={`${styles.title} ${styles.text}`}>
                        {data.label}
                    </Typography>
                    <Typography component="div" className={`${styles.text}`}>
                        {data.value}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
};
SummaryCard.COLORS_CLASSNAME = {
    DEFAULT: 'default-color',
    RED: 'red-accent'
};

export default SummaryCard;
