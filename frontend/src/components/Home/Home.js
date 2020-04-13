import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import "./Home.css";


export default function Home() {
    const [parts, setParts] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3005/api/parts").then((res) => {
            console.log(res, res.data);
            setParts(res.data.message);
        });
    }, []);
    return (
        <div className="Home">
            <div className="lander">
                <h1>GasestePiesa.online</h1>
                <p>Gaseste usor o piesa</p>

                <Table striped bordered hover responsive>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>Denumire</th>
                            <th>Cod</th>
                            <th>Stoc</th>
                            <th>Data adaugare</th>
                        </tr>
                        {parts.map(part =>
                            <tr key={part.id}>
                                <td>{part.id}</td>
                                <td>{part.name}</td>
                                <td>{part.code}</td>
                                <td>{part.stock}</td>
                                <td>{part.addedAt}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}