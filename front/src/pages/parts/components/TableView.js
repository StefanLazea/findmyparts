import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const TableView = () => {
    const columns = [
        { name: 'id', label: 'id' },
        { name: 'name', label: 'denumire' },
        { name: 'code', label: 'Cod piesa' },
        { name: 'stock', label: 'Stoc' },
    ]
    const [dataList, setDataList] = useState([])

    useEffect(() => {
        axios.get(`/parts`).then(response => { setDataList(response.data) })
    }, []);

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

