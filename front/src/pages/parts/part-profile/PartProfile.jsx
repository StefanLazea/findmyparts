import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

import { PageContainer } from '../../../components/page-container/PageContainer'
import { SummaryCard } from '../components/summary-card/SummaryCard';
import { PartOwnerCard } from '../components/part-owner-card/PartOwnerCard';

import { Grid, Divider } from '@mui/material';
import _ from 'lodash'

import styles from './PartProfile.module.scss'

export const PartProfile = ({ ...props }) => {
    const { state } = useLocation();
    const selectedPart = _.get(state, 'selectedPart', {});

    useEffect(() => {
        console.log(selectedPart)
    }, [state])

    return <PageContainer classes={{ root: styles.partsContainer }}>
        <div className={styles.partsHeader}>
            <span className={styles.title}>Piesa ta, {selectedPart.code}</span>
            <div className={styles.summariesGrid}>
                <Grid container rowSpacing={4} spacing={{ xs: 1, sm: 3, md: 6 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                    <Grid item xs={1} sm={3} md={3}>
                        <SummaryCard />
                    </Grid>
                    <Grid item xs={1} sm={3} md={3}>
                        <SummaryCard />
                    </Grid>
                    <Grid item xs={1} sm={3} md={3}>
                        <SummaryCard />
                    </Grid>
                    <Grid item xs={1} sm={3} md={3}>
                        <SummaryCard />
                    </Grid>
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