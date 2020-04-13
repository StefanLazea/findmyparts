import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import "./Home.css";


export default function Home() {
    const [test, setTest] = useState(0);
    const [parts, setParts] = useState([]);
    const getParts = () => {


    }
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
                <p>Gaseste usor o piesa {test}</p>
                <button onClick={() => { getParts(); setTest(test + 1) }}>Apasa</button>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Denumire</th>
                            <th>Cod</th>
                            <th></th>
                            <th>Table heading</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map(part =>
                            <tr key={part.id}>
                                <td>{part.id}</td>
                                <td>{part.name}</td>
                                <td>{part.code}</td>
                                <td>{part.stock}</td>
                                <td>Table cell</td>

                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}