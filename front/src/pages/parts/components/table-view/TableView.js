import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"

export const TableView = () => {
    const columns = [
        { name: 'id', label: 'id' },
        { name: 'name', label: 'denumire' },
        { name: 'code', label: 'cod piesa' },
        { name: 'stock', label: 'stoc' },
        { name: 'stock', label: 'pret' },

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
                        return <TableCell key={_.uniqueId()}>{column.label}</TableCell>
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
                {dataList.map(item => {
                    return <TableRow
                        key={_.uniqueId()}
                        //remove this
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.stock}</TableCell>
                        <TableCell>{item.price}</TableCell>
                    </TableRow>
                })}

            </TableBody>
        </Table>
    </TableContainer>
}

