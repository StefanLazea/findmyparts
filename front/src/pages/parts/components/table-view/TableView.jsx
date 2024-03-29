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
} from '@mui/material';
import { NoData } from 'components/no-data/NoData';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { EditPartDialog } from '../edit-part/EditPartDialog';

import { useGlobalContext } from 'global-context';
import styles from './TableView.module.scss';
import { LABELS } from 'constants/labels';

const ALL_USERS_COLUMNS = [
    { name: 'name', label: 'denumire' },
    { name: 'code', label: 'cod piesa' },
    { name: 'total', label: 'stoc total' },
    { name: 'delete', label: '' }
];
export const TableView = ({ showAllParts }) => {
    const [columns, setColumns] = useState(ALL_USERS_COLUMNS);
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedPart, setSelectedPart] = useState({});
    const [openEditModal, setOpenEditModal] = useState(false);
    const navigate = useNavigate();
    const {
        state: { socket, userId }
    } = useGlobalContext();

    useEffect(() => {
        if (!showAllParts) {
            setColumns((prev) => [...prev, { name: 'edit', label: '' }]);
        } else {
            setColumns(ALL_USERS_COLUMNS);
        }
    }, [showAllParts]);

    useEffect(() => {
        const path = showAllParts
            ? `/parts/users/stock/details`
            : `/parts/users/${userId}/stock/details`;
        let isApiSubscribed = true;
        axios
            .get(path)
            .then((response) => {
                setIsLoading(false);
                if (isApiSubscribed) {
                    setDataList(response.data);
                }
            })
            .catch(() => setIsLoading(false));

        return () => {
            isApiSubscribed = false;
        };
    }, [showAllParts]);

    const deletePart = (part) => {
        axios.delete(`/parts/${part.id}`).then((response) => {
            socket.emit('deletePart', part.id);
        });
    };

    const openPartProfile = (item) => {
        navigate('/part-profile', {
            state: { selectedPart: item }
        });
    };

    //socket update
    useEffect(() => {
        const handler = (parts) => {
            setDataList(parts);
        };
        socket.on('partsListUpdate', handler);
        return () => {
            socket.off('partsListUpdate', handler);
        };
    }, [socket]);

    if (dataList.length === 0 && !isLoading) {
        return (
            <NoData title={LABELS.createPart} subtitle={LABELS.noPartFound} />
        );
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => {
                            return (
                                <TableCell key={_.uniqueId()}>
                                    {column.label}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataList.length !== 0 &&
                        dataList?.map((item) => {
                            return (
                                <TableRow key={_.uniqueId()}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell
                                        classes={{ root: styles.linkProfile }}
                                        onClick={() => openPartProfile(item)}>
                                        {item.code}
                                    </TableCell>
                                    <TableCell>{item.total}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => deletePart(item)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    {!showAllParts && (
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => {
                                                    setSelectedPart(item);
                                                    setOpenEditModal(true);
                                                }}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            {selectedPart && openEditModal && (
                <EditPartDialog
                    part={selectedPart}
                    open={openEditModal}
                    setOpen={setOpenEditModal}
                    oneUserDisplay={true}
                />
            )}
        </TableContainer>
    );
};
