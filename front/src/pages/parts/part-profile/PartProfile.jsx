import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { PageContainer } from '../../../components/page-container/PageContainer'
import { SummaryCard } from '../components/summary-card/SummaryCard';
import { PartOwnerCard } from '../components/part-owner-card/PartOwnerCard';

import { Grid, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import _ from 'lodash'

import styles from './PartProfile.module.scss'
import axios from 'axios';

export const PartProfile = ({ ...props }) => {
    const { state } = useLocation();
    const [usersWithPart, setUsersWithPart] = useState([])
    const selectedPart = _.get(state, 'selectedPart', {});
    const summaryDetails = [
        {
            value: '100',
            label: 'Pret mediu',
        },
        {
            value: '80',
            label: 'Pret mediu'
        },
        {
            value: '10',
            label: 'Stocul tau'
        },
        {
            value: '10+',
            label: 'Cereri'
        }
    ]
    useEffect(() => {
        axios.get('/parts/0d5bc5c0-cb16-11ec-b68e-eb7fb4661e00/users/stock').then(res => {
            const users = _.get(res, 'data.users', []);
            console.log(users)
            setUsersWithPart(users)
        })
    }, [state])

    return <PageContainer classes={{ root: styles.partsContainer }}>
        <div className={styles.partsHeader}>
            <div className={styles.profileTitle}>
                <span className={styles.title}>Piesa ta, {selectedPart.code}</span>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => { }}
                    aria-label="close"
                    disabled
                >
                    <EditIcon />
                </IconButton>
            </div>
            <div className={styles.summariesGrid}>
                <Grid container rowSpacing={4} spacing={{ xs: 1, sm: 3, md: 6 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                    {summaryDetails.map(item => <Grid item xs={1} sm={3} md={3} key={_.uniqueId()}>
                        <SummaryCard data={item} />
                    </Grid>)}

                </Grid>
            </div>
            <Divider classes={{ root: styles.partsDivider }} />
        </div>
        <div className={styles.usersPartsList}>
            <span className={styles.title}>Utilizatori care au aceeasi piesa</span>
            <Grid container rowSpacing={2} spacing={{ xs: 1, sm: 3, md: 6 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                {usersWithPart.map(userWithPart =>
                    <Grid item xs={1} sm={3} md={6} key={_.uniqueId()}>
                        <PartOwnerCard data={userWithPart} />
                    </Grid>)}
            </Grid>
        </div>
    </PageContainer>
}