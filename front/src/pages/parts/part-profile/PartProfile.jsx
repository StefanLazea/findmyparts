import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { PageContainer } from '../../../components/page-container/PageContainer'
import { PartOwnerCard } from '../components/part-owner-card/PartOwnerCard';
import { PartsDetailsView } from '../components/part-details-view/PartsDetailsView'
import { Grid, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import _ from 'lodash'

import styles from './PartProfile.module.scss'
import axios from 'axios';

export const PartProfile = () => {
    const { state } = useLocation();
    const [usersWithPart, setUsersWithPart] = useState([])
    const selectedPart = _.get(state, 'selectedPart', {});

    useEffect(() => {
        axios.get(`/parts/${selectedPart.id}/users/stock`).then(res => {
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
            <PartsDetailsView partId={selectedPart.id} />
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