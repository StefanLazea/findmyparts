import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import styles from './SummaryCard.module.scss';
import SummaryText from './SummaryText';

const SummaryCard = ({ data, ...props }) => {
    return (
        <Card classes={{ root: styles.summaryCard }}>
            <CardContent onClick={props.onClick}>
                <SummaryText data={data} />
            </CardContent>
        </Card>
    );
};
SummaryCard.COLORS_CLASSNAME = {
    DEFAULT: 'default-color',
    RED: 'red-accent'
};

export default SummaryCard;
