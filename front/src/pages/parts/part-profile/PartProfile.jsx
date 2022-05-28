import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';

import { Grid, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { PageContainer } from 'components/page-container/PageContainer'
import { PartOwnerCard } from '../components/part-owner-card/PartOwnerCard';
import { PartsDetailsView } from '../components/part-details-view/PartsDetailsView'
import { EditPartDialog } from '../components/edit-part/EditPartDialog';
import { useGlobalContext } from 'global-context';

import _ from 'lodash'
import styles from './PartProfile.module.scss'

export const PartProfile = () => {
    const { state } = useLocation();
    const partId = _.get(state, 'selectedPart.id', {});
    const initPart = _.get(state, 'selectedPart', {})

    const [openEditModal, setOpenEditModal] = useState(false)
    const [selectedPart, setSelectedPart] = useState();
    const { state: { socket } } = useGlobalContext();
    const getPartStocks = () => {
        axios.get(`/parts/${partId}/users/stock/details`).then(res => {
            setSelectedPart(res.data)
        })
    }

    useEffect(() => {
        getPartStocks();
    }, [])

    useEffect(() => {
        const handler = (part) => {
            console.log('client side am primit', part)
            // setDataList(part)
            getPartStocks()
        }
        socket.on('refreshProfilePage', handler)
        return () => socket.off('refreshProfilePage', handler)
    }, [])

    // if (isLoading) {
    //     return <div>is loading</div>
    // }
    return <PageContainer classes={{ root: styles.partsContainer }}>
        <div className={styles.partsHeader}>
            <div className={styles.profileTitle}>
                <div className={styles.textContainer}>
                    <span className={styles.title}>Piesa ta, {_.get(selectedPart, 'code', initPart.code)}</span>
                    <span className={styles.subtitle}>{_.get(selectedPart, 'name', initPart.name)}</span>
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
            <PartsDetailsView partId={partId} />
            <Divider classes={{ root: styles.partsDivider }} />
        </div>
        <div className={styles.usersPartsList}>
            <span className={styles.title}>Utilizatori care au aceeasi piesa</span>
            <Grid container rowSpacing={2} spacing={{ xs: 1, sm: 3, md: 6 }} columns={{ xs: 1, sm: 6, md: 12 }}>
                {_.get(selectedPart, 'stocks', []).map(userWithPart =>
                    <Grid item xs={1} sm={3} md={6} key={_.uniqueId()}>
                        <PartOwnerCard data={userWithPart} />
                    </Grid>)}
            </Grid>
        </div>
        {/* TODO handle update case, trigger other events use /parts/c4aace40-dc52-11ec-805d-35558522ce40/users/stock */}
        {openEditModal && <EditPartDialog part={selectedPart} open={openEditModal} setOpen={setOpenEditModal} />}
    </PageContainer>
}