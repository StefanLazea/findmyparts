import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';

import { AddPartDialog } from './components/add-part/AddPartDialog';
import { TableView } from './components/table-view/TableView';

import styles from './Parts.module.scss';

export const Parts = () => {
    const [openModal, setOpenAddModal] = useState(false);
    const [showAllParts, setShowAllParts] = useState(true);
    return (
        <Container maxWidth="lg" className={styles.partsContainer}>
            <div className={styles.headerButtons}>
                <IconButton
                    color="primary"
                    aria-label="grid view"
                    onClick={() => setOpenAddModal(true)}>
                    <AddIcon />
                </IconButton>
                <div className={styles.switchButton}>
                    <IconButton
                        color="primary"
                        aria-label="grid view"
                        onClick={() => setShowAllParts(true)}>
                        <GroupIcon
                            sx={{ color: showAllParts ? '#7E6BEF' : '#4281A4' }}
                        />
                    </IconButton>
                    <IconButton
                        color="primary"
                        aria-label="grid view"
                        onClick={() => setShowAllParts(false)}>
                        <PersonIcon
                            sx={{
                                color: !showAllParts ? '#7E6BEF' : '#4281A4'
                            }}
                        />
                    </IconButton>
                </div>
            </div>
            <div className={styles.tableContainer}>
                <TableView showAllParts={showAllParts} />
            </div>
            {openModal && (
                <AddPartDialog open={openModal} setOpen={setOpenAddModal} />
            )}
        </Container>
    );
};
