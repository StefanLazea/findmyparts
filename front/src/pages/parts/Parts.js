import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { MdTableRows, MdGridView } from "react-icons/md";
import './Parts.scss';
export const Parts = (props) => {
    const columns = [
        { name: 'id', label: 'Id' },
        { name: 'partNumber', label: 'Part number' },
        { name: 'stock', label: 'Stock' },
    ]
    const [dataList, setDataList] = useState([])
    const [cardsView, setCardsView] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3005/api/parts').then(response => { setDataList(response.data) })
    }, []);
    const TableView = () => {
        return <Table striped bordered hover>
            <thead>
                <tr>
                    {columns.map(column => {
                        return <th key={column.name}>{column.label}</th>
                    })}

                </tr>
            </thead>
            <tbody>
                {dataList.map(item => {
                    return <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.stock}</td>
                    </tr>
                }
                )}

            </tbody>
        </Table>

    }
    const CardsView = () => {
        return <div></div>
    }
    return (
        <div className="parts-page">
            <div className="switch-button">
                <Button variant="link" onClick={() => setCardsView(true)}><MdGridView /></Button>{' '}
                <Button variant="link" onClick={() => setCardsView(false)}><MdTableRows /></Button>{' '}
            </div>
            {cardsView ? <CardsView /> : <TableView />}
        </div>
    );
}

