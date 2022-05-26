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

import { useGlobalContext } from 'global-context'
import styles from './TableView.module.scss'
import { EditPartDialog } from '../edit-part/EditPartDialog';

export const TableView = ({ showAllParts, ...props }) => {
    const columns2 = [
        { name: 'name', label: 'denumire' },
        { name: 'code', label: 'cod piesa' },
        { name: 'total', label: 'stoc total' },
        { name: 'delete', label: '' },
        // ...!showAllParts ? { name: 'edit', label: '' } : {}
        // ...(!showAllParts && { name: 'edit', label: '' }),
    ]
    const [columns, setColumns] = useState([
        { name: 'name', label: 'denumire' },
        { name: 'code', label: 'cod piesa' },
        { name: 'total', label: 'stoc total' },
        { name: 'delete', label: '' },
    ])
    const [dataList, setDataList] = useState([])
    const [selectedPart, setSelectedPart] = useState({})
    const [openEditModal, setOpenEditModal] = useState(false)
    const [reRender, setRerender] = useState(false)
    const navigate = useNavigate();
    const { state: { socket } } = useGlobalContext();

    useEffect(() => {
        if (!showAllParts) {
            setColumns((prev) => [...prev, { name: 'edit', label: '' }])
        }
    }, [showAllParts])

    useEffect(() => {
        //TODO needs works on format
        //replace so that you can see parts without stock
        axios.get(`/parts/users/stock/details`).then(response => {
            console.log(response)
            setDataList(response.data)
        })
    }, [reRender]);

    const deletePart = (part) => {
        console.log(part)
        axios.delete(`/parts/${part.id}`).then(response => {
            console.log(response);
            socket.emit('deletePart', part.id)
        })
    }

    const openPartProfile = (item) => {
        navigate("/part-profile", {
            state: { selectedPart: item }
        })
    }

    useEffect(() => {
        const handler = (parts) => {
            console.log('client side am primit', parts)
            setDataList(parts)
        }
        socket.on('partsListUpdate', handler)
        return () => socket.off("partsListUpdate", handler);
    }, [])

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
                        >
                            <TableCell>{item.name}</TableCell>
                            <TableCell classes={{ root: styles.linkProfile }} onClick={() => openPartProfile(item)}>{item.code}</TableCell>
                            <TableCell>{item.total}</TableCell>
                            {/* <TableCell>{item.price}</TableCell> */}
                            <TableCell>
                                <IconButton color="primary" onClick={() => deletePart(item)}><DeleteIcon /></IconButton>
                            </TableCell>
                            {!showAllParts &&
                                <TableCell>
                                    <IconButton color="primary" onClick={() => { setSelectedPart(item); setOpenEditModal(true) }}><EditIcon /></IconButton>
                                </TableCell>
                            }

                        </TableRow>
                    })}

                </TableBody>
            </Table>
            {selectedPart
                && openEditModal
                && <EditPartDialog
                    part={selectedPart}
                    open={openEditModal}
                    setOpen={setOpenEditModal}
                />
            }
        </TableContainer>
    );
}

