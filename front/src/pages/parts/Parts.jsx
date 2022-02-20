import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddIcon from '@mui/icons-material/Add';

import Container from '@mui/material/Container';
import { TableView } from './components/TableView'
import './Parts.scss';

export const Parts = (props) => {


    const [cardsView, setCardsView] = useState(false)
    const [openAddModal, setOpenAddModal] = useState(false);

    const CardsView = () => {
        return <div>grid</div>
    }

    return (
        <Container maxWidth="lg">
            <div className='header-buttons'>
                <IconButton color="primary" aria-label="grid view" onClick={() => setOpenAddModal(true)}><AddIcon /></IconButton>

                <div className="switch-button">
                    <IconButton color="primary" aria-label="grid view" onClick={() => setCardsView(true)}><DashboardIcon /></IconButton>
                    <IconButton color="primary" aria-label="grid view" onClick={() => setCardsView(false)}><TableRowsIcon /></IconButton>
                </div>
            </div>
            {cardsView ? <CardsView /> : <TableView />}
        </Container>
    );
}

