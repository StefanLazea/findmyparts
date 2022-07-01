import React, { useEffect, useState } from 'react';

import { useGlobalContext } from 'global-context';
import axios from 'axios';
import _ from 'lodash';

import { Grid, CircularProgress } from '@mui/material';
import { PieChart } from 'components/charts/pie-chart/PieChart';
import { LineChart } from 'components/charts/line-chart/LineChart';
import { PageContainer } from 'components/page-container/PageContainer';
import { ProfileCard } from './components/ProfileCard';

import styles from './Home.module.scss';
import { LABELS } from 'constants/labels';

export const Home = () => {
    const {
        state: { userId }
    } = useGlobalContext();

    const [lineChartData, setLineChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            axios.get(`/documents/user/${userId}`),
            axios.get(`/documents/expired/user/${userId}`)
        ])
            .then((res) => {
                console.log(res);
                setLineChartData(_.get(res, '[0].data', []));
                setPieChartData(_.get(res, '[1].data.expiredCount', []));
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);

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
                        <span>{LABELS.expiredDocuments}</span>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <PieChart data={pieChartData} />
                        )}
                    </div>
                </Grid>
            </Grid>
            <div className={styles.lineContainer}>
                <span className={styles.lineChartTitle}>
                    {LABELS.documentsCosts}
                </span>
                <LineChart data={lineChartData} />
            </div>
        </PageContainer>
    );
};
