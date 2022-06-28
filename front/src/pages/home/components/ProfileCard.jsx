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
import AvatarIcon from 'assets/icons/AvatarIcon';

export const ProfileCard = ({ carData = {}, ...props }) => {
    return (
        <Card classes={{ root: styles.profileCard }}>
            <CardContent
                onClick={() => {}}
                classes={{ root: styles.customCard }}>
                <div className={styles.cardContent}>
                    <div className={styles.userInfoCardContent}>
                        <AvatarIcon />
                        <div className={styles.userInfoContainer}>
                            <span className={`${styles.textAlign}`}>
                                Lazea Stefan
                            </span>
                            <span className={styles.textAlign}>
                                lazeastefan@gmail.com
                            </span>
                        </div>
                    </div>
                    <div className={styles.summaryContainer}>test</div>
                </div>
            </CardContent>
        </Card>
    );
};
