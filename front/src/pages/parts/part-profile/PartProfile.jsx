import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

import { PageContainer } from '../../../components/page-container/PageContainer'
import { SummaryCard } from '../components/summary-card/SummaryCard';

import { Grid } from '@mui/material';
import _ from 'lodash'

import styles from './PartProfile.module.scss'

export const PartProfile = ({ ...props }) => {
    const { state } = useLocation();
    const selectedPart = _.get(state, 'selectedPart', {});

    useEffect(() => {
        console.log(selectedPart)
    }, [state])

    return <PageContainer>
        <div>
            <span>Piesa ta, {selectedPart.code}</span>
            <div className={styles.summariesGrid}>
                <Grid container rowSpacing={4} spacing={{ xs: 1, sm: 3, md: 6 }} columns={{ xs: 1, sm: 8, md: 12 }}>
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
        </div>
    </PageContainer>
}