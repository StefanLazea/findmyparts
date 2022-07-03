import React, { useEffect, useState } from 'react';

import { useGlobalContext } from 'global-context';
import axios from 'axios';
import { Card, CardContent, IconButton } from '@mui/material';

import SummaryText from 'components/summary-card/SummaryText';

import DeleteIcon from '@mui/icons-material/Delete';
import AvatarIcon from 'assets/icons/AvatarIcon';

import styles from './ProfileCard.module.scss';
import _ from 'lodash';

export const ProfileCard = () => {
    const [details, setDetails] = useState({});
    const {
        state: { userId, userDetails }
    } = useGlobalContext();
    useEffect(() => {
        let isApiSubscribed = true;
        axios.get(`/statistics/details/user/${userId}`).then((res) => {
            if (isApiSubscribed) {
                setDetails(res.data);
            }
        });
        return () => {
            isApiSubscribed = false;
        };
    }, []);
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
                                {_.get(userDetails, 'name', 'N/A')}
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
                                {_.get(userDetails, 'email', 'N/A')}
                            </span>
                        </div>
                    </div>
                    <div className={styles.summaryContainer}>
                        <SummaryText
                            data={{
                                label: 'Mașini',
                                value: _.get(details, 'cars', 0)
                            }}
                        />
                        <SummaryText
                            data={{
                                label: 'Piese',
                                value: _.get(details, 'parts', 0)
                            }}
                        />
                        <SummaryText
                            data={{
                                label: 'Acte',
                                value: _.get(details, 'documents', 0)
                            }}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
