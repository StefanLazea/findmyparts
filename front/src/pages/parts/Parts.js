import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Parts.scss';
export const Parts = (props) => {

    //get from backend
    const columns = [
        { name: 'id', label: 'id' },
        { name: 'name', label: 'denumire' },
        { name: 'code', label: 'Cod piesa' },
        { name: 'stock', label: 'Stoc' },
    ]
    const [dataList, setDataList] = useState([])
    const [cardsView, setCardsView] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/parts`).then(response => { setDataList(response.data) })
    }, []);

    const TableView = () => {

        return <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map(column => {
                            return <TableCell key={column.name}>{column.label}</TableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataList.map(item => {
                        return <TableRow
                            key={item.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.code}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                        </TableRow>
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    }
    const CardsView = () => {
        return <div>grid</div>
    }
    return (
        <Container maxWidth="lg">
            <div className="switch-button">
                <IconButton color="primary" aria-label="grid view" onClick={() => setCardsView(true)}><DashboardIcon /></IconButton>
                <IconButton color="primary" aria-label="grid view" onClick={() => setCardsView(false)}><TableRowsIcon /></IconButton>
            </div>
            {cardsView ? <CardsView /> : <TableView />}
        </Container>
    );
}

