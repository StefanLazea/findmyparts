import React, { useEffect, useState } from 'react';

import { SummaryCard } from '../summary-card/SummaryCard';
import { useGlobalContext } from '../../../../global-context';
import { Grid } from '@mui/material';
import _ from 'lodash'

import styles from './PartsDetailsView.module.scss'
import axios from 'axios';

const DEFAULT_summaryDetails = [
    {
        value: '100',
        label: 'Pret mediu',
    },
    {
        value: '80',
        label: 'Pretul tau'
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
export const PartsDetailsView = ({ partId, ...props }) => {
    const { state: { userId } } = useGlobalContext();
    const [details, setDetails] = useState([]);
    useEffect(() => {
        axios.get(`/stocks/details/user/${userId}/part/${partId}`).then(res => {
            // setDetails(prev => {
            //     return {
            //         ...prev,
            //         ...{
            //             value: '10+',
            //             label: 'Cereri'
            //         }
            //     }
            // })
            console.log(res)
        })
    }, [])

    return (
        <div className={styles.summariesGrid}>
            <Grid container rowSpacing={4} spacing={{ xs: 1, sm: 3, md: 6 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                {DEFAULT_summaryDetails.map(item => <Grid item xs={1} sm={3} md={3} key={_.uniqueId()}>
                    <SummaryCard data={item} />
                </Grid>)}

            </Grid>
        </div>
    )

}