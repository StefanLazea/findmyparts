import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import _ from 'lodash';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const TableView = () => {
    const columns = [
        { name: 'id', label: 'id' },
        { name: 'name', label: 'denumire' },
        { name: 'code', label: 'cod piesa' },
        { name: 'stock', label: 'stoc' },
        { name: 'stock', label: 'pret' },

    ]
    const [dataList, setDataList] = useState([])
    const [reRender, setRerender] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/parts/users/stock`).then(response => { setDataList(response.data) })
    }, [reRender]);

    const deletePart = (part) => {
        console.log(part)
        axios.delete(`/parts/${part.id}`).then(response => { console.log(response); setRerender(prev => !prev) })
    }

    const openPartProfile = (item) => {
        navigate("/part-profile", {
            state: { selectedPart: item }
        })
    }

    return (
        <TableContainer component={Paper}>
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
                            onClick={() => openPartProfile(item)}
                        >
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.code}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => deletePart(item)}><DeleteIcon /></IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => console.log(item)}><EditIcon /></IconButton>
                            </TableCell>

                        </TableRow>
                    })}

                </TableBody>
            </Table>
        </TableContainer>
    );
}

