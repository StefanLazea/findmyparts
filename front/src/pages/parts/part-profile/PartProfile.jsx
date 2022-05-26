import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';

import { Grid, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { PageContainer } from 'components/page-container/PageContainer'
import { PartOwnerCard } from '../components/part-owner-card/PartOwnerCard';
import { PartsDetailsView } from '../components/part-details-view/PartsDetailsView'
import { EditPartDialog } from '../components/edit-part/EditPartDialog';
import { useGlobalContext } from '../../../global-context';

import _ from 'lodash'
import styles from './PartProfile.module.scss'

export const PartProfile = () => {
    const { state } = useLocation();
    const [usersWithPart, setUsersWithPart] = useState([])
    const [openEditModal, setOpenEditModal] = useState(false)
    const selectedPart = _.get(state, 'selectedPart', {});
    const { state: { userId, socket } } = useGlobalContext();

    console.log('PART SELECTED', selectedPart)
    useEffect(() => {
        axios.get(`/parts/${selectedPart.id}/users/stock`).then(res => {
            const users = _.get(res, 'data.users', []);
            console.log('BINGO', users)
            setUsersWithPart(users)
        })
    }, [state])

    useEffect(() => {
        console.log('refresh')
        const handler = (parts) => {
            console.log('client side am primit', parts)
            // setDataList(parts)
        }
        socket.on('refreshProfilePage', handler)
    }, [])

    return <PageContainer classes={{ root: styles.partsContainer }}>
        <div className={styles.partsHeader}>
            <div className={styles.profileTitle}>
                <div className={styles.textContainer}>
                    <span className={styles.title}>Piesa ta, {selectedPart.code}</span>
                    <span className={styles.subtitle}>{selectedPart.name}</span>
                </div>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => { }}
                    aria-label="close"
                    onClick={() => setOpenEditModal(true)}
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
        {openEditModal && <EditPartDialog part={selectedPart} open={openEditModal} setOpen={setOpenEditModal} />}
    </PageContainer>
}