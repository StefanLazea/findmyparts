import React from 'react';

import { Typography } from '@mui/material';

import styles from './SummaryText.module.scss';

const SummaryTest = ({ data, className }) => {
    return (
        <div
            className={`${styles.summaryTextContent}${
                className ? ' ' + className : ''
            }`}>
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
