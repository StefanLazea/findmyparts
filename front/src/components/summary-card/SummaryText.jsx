import React from 'react';

import { Typography } from '@mui/material';

import styles from './SummaryCard.module.scss';

const SummaryTest = ({ data }) => {
    return (
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
    );
};

export default SummaryTest;
