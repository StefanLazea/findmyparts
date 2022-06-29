import React from 'react';

import { Card, CardContent, IconButton } from '@mui/material';

import SummaryText from 'components/summary-card/SummaryText';

import DeleteIcon from '@mui/icons-material/Delete';
import AvatarIcon from 'assets/icons/AvatarIcon';

import styles from './ProfileCard.module.scss';

export const ProfileCard = ({ props }) => {
    return (
        <Card classes={{ root: styles.profileCard }}>
            <CardContent
                onClick={() => {}}
                classes={{ root: styles.customCard }}>
                <div className={styles.cardContent}>
                    <div className={styles.userInfoCardContent}>
                        <AvatarIcon />
                        <div className={styles.userInfoContainer}>
                            <span className={`${styles.userNameContainer}`}>
                                Lazea Stefan
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="close"
                                    classes={{ root: styles.deleteIcon }}
                                    onClick={() => {}}>
                                    <DeleteIcon />
                                </IconButton>
                            </span>
                            <span className={styles.email}>
                                lazeastefan@gmail.com
                            </span>
                        </div>
                    </div>
                    <div className={styles.summaryContainer}>
                        <SummaryText data={{ label: 'Mașini', value: '10' }} />
                        <SummaryText data={{ label: 'Piese', value: '300' }} />
                        <SummaryText data={{ label: 'Acte', value: '10' }} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
