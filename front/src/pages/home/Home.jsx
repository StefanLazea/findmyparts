import React from 'react';

import _ from 'lodash';
import { Grid } from '@mui/material';

import { PieChart } from 'components/pie-chart/PieChart';
import { LineChart } from 'components/line-chart/LineChart';
import { PageContainer } from 'components/page-container/PageContainer';
import { ProfileCard } from './components/ProfileCard';
import styles from './Home.module.scss';

export const Home = () => {
    const data = [
        {
            id: 'php',
            label: 'php',
            value: 46,
            color: 'hsl(73, 70%, 50%)'
        },
        {
            id: 'c',
            label: 'c',
            value: 252,
            color: 'hsl(99, 70%, 50%)'
        },
        {
            id: 'javascript',
            label: 'javascript',
            value: 563,
            color: 'hsl(65, 70%, 50%)'
        },
        {
            id: 'go',
            label: 'go',
            value: 7,
            color: 'hsl(100, 70%, 50%)'
        },
        {
            id: 'ruby',
            label: 'ruby',
            value: 133,
            color: 'hsl(286, 70%, 50%)'
        }
    ];
    return (
        <PageContainer>
            <div className={styles.homeHeader}>
                Salut, {_.get(localStorage, 'userName', '')}
            </div>
            <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className={styles.gridContainer}>
                <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    align="center"
                    justify="center"
                    alignItems="center"
                    className={styles.imageElement}>
                    <ProfileCard />
                </Grid>
                <Grid
                    item
                    xs={4}
                    sm={4}
                    md={8}
                    align="center"
                    justify="center"
                    alignItems="center"
                    className={styles.itemContainer}>
                    <div className={styles.partsPie}>
                        <PieChart data={data} />
                    </div>
                </Grid>
            </Grid>
            <div className={styles.lineContainer}>
                <LineChart />
            </div>
        </PageContainer>
    );
};
