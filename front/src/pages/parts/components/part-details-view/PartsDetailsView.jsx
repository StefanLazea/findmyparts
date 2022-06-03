import React, { useEffect, useState } from 'react';

import SummaryCard from 'components/summary-card/SummaryCard';
import { useGlobalContext } from 'global-context';
import { Grid } from '@mui/material';
import _ from 'lodash';
import axios from 'axios';

import styles from './PartsDetailsView.module.scss';

export const PartsDetailsView = ({ partId }) => {
    const {
        state: { userId, socket }
    } = useGlobalContext();
    const [details, setDetails] = useState([]);

    const getPartsSummary = () => {
        axios
            .get(`/stocks/details/user/${userId}/part/${partId}`)
            .then((res) => {
                console.log(res.data);
                const detailsData = [
                    {
                        value: _.get(res, 'data.mediumPrice', 0),
                        label: 'Pret mediu'
                    },
                    {
                        value: _.get(res, 'data.userPrice', 0),
                        label: 'Pretul tau'
                    },
                    {
                        value: _.get(res, 'data.allStock', 0),
                        label: 'Stocul total'
                    },
                    {
                        value: _.get(res, 'data.userStock', 0),
                        label: 'Stocul tau'
                    }
                ];
                setDetails(detailsData);
            });
    };
    useEffect(() => {
        getPartsSummary();
    }, []);

    useEffect(() => {
        const handler = () => {
            // console.log('client side am primit', parts)
            getPartsSummary();
        };
        socket.on('refreshProfilePage', handler);
        return () => socket.off('refreshProfilePage', handler);
    }, []);

    return (
        <div className={styles.summariesGrid}>
            <Grid
                container
                rowSpacing={4}
                spacing={{ xs: 1, sm: 3, md: 6 }}
                columns={{ xs: 1, sm: 6, md: 12 }}>
                {details.map((item) => (
                    <Grid item xs={1} sm={3} md={3} key={_.uniqueId()}>
                        <SummaryCard data={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
