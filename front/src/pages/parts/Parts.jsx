import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';

import { AddPartDialog } from './components/add-part/AddPartDialog';
import { TableView } from './components/table-view/TableView'

import './Parts.scss';

export const Parts = (props) => {
    const [openModal, setOpenAddModal] = useState(false);
    const [showAllParts, setShowAllParts] = useState(true)
    return (
        <Container maxWidth="lg">
            <div className='header-buttons'>
                <IconButton color="primary" aria-label="grid view" onClick={() => setOpenAddModal(true)}><AddIcon /></IconButton>
                <div className="switch-button">
                    <IconButton color="primary" aria-label="grid view" onClick={() => setShowAllParts(true)}><GroupIcon sx={{ color: showAllParts ? '#2C8C99' : '#00000' }} /></IconButton>
                    <IconButton color="primary" aria-label="grid view" onClick={() => setShowAllParts(false)}><PersonIcon sx={{ color: !showAllParts ? '#2C8C99' : '#00000' }} /></IconButton>
                </div>
            </div>
            <TableView showAllParts={showAllParts} />
            {openModal && <AddPartDialog open={openModal} setOpen={setOpenAddModal} />}
        </Container>
    );
}

