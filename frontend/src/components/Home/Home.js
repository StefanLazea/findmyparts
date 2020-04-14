import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Axios from "axios";
import "./Home.css";


const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

export default function Home() {
    const [parts, setParts] = useState([]);
    const [isLogged, setLogged] = useState(false);
    useEffect(() => {
        Axios.get(`${getBasename()}/api/parts`).then((res) => {
            console.log(res, res.data);
            setParts(res.data.message);
        });
    }, []);

    const deletePart = () => {
        console.log("sterg")
    }

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
                                {isLogged === true ?
                                    <td>
                                        <Button
                                            id={"button" + part.id}
                                            className="btn-primary">
                                            <i className="fa fa-pencil"></i>
                                        </Button>

                                        <Button
                                            className="btn-danger"
                                            onClick={() => { deletePart(part.id) }}>
                                            <i className="fa fa-trash"></i>
                                        </Button>
                                    </td>
                                    : null
                                }
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div >
    );
}