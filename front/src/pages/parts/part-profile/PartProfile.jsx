import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

import { PageContainer } from '../../../components/page-container/PageContainer'
import { SummaryCard } from '../components/summary-card/SummaryCard';
import { PartOwnerCard } from '../components/part-owner-card/PartOwnerCard';

import { Grid, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import _ from 'lodash'

import styles from './PartProfile.module.scss'

export const PartProfile = ({ ...props }) => {
    const { state } = useLocation();
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
        console.log(selectedPart)
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
                    {summaryDetails.map(item => <Grid item xs={1} sm={3} md={3}>
                        <SummaryCard data={item} />
                    </Grid>)}

                </Grid>
            </div>
            <Divider classes={{ root: styles.partsDivider }} />
        </div>
        <div className={styles.usersPartsList}>
            <span className={styles.title}>Utilizatori care au aceeasi piesa</span>
            <Grid container rowSpacing={2} spacing={{ xs: 1, sm: 3, md: 6 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                <Grid item xs={1} sm={3} md={6}>
                    <PartOwnerCard />
                </Grid>
                <Grid item xs={1} sm={3} md={6}>
                    <PartOwnerCard />
                </Grid>
                <Grid item xs={1} sm={3} md={6}>
                    <PartOwnerCard />
                </Grid>
                <Grid item xs={1} sm={3} md={6}>
                    <PartOwnerCard />
                </Grid>
                <Grid item xs={1} sm={3} md={6}>
                    <PartOwnerCard />
                </Grid>
                <Grid item xs={1} sm={3} md={6}>
                    <PartOwnerCard />
                </Grid>
                <Grid item xs={1} sm={3} md={6}>
                    <PartOwnerCard />
                </Grid>
                <Grid item xs={1} sm={3} md={6}>
                    <PartOwnerCard />
                </Grid>

            </Grid>
        </div>
    </PageContainer>
}