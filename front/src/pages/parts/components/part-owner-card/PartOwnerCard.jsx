import React from 'react';

import { Card, CardContent, Typography, IconButton } from '@mui/material'
import AddCardIcon from '@mui/icons-material/AddCard';
import styles from './PartOwnerCard.module.scss'

export const PartOwnerCard = ({ data, ...props }) => {
    return (
        <Card classes={{ root: styles.summaryCard }}>
            <CardContent onClick={props.onClick}>
                <div className={styles.summaryCardContent}>
                    <div className={styles.requestPart}>
                        <Typography component="div" >
                            {data.email}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => { }}
                            aria-label="close"
                        >
                            <AddCardIcon />
                        </IconButton>
                    </div>
                    <Typography component="div" >
                        {data.quantity}
                    </Typography>

                </div>
            </CardContent>
        </Card>
    );
}