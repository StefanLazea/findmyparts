import React from "react";
import { Form, Col, Button, Row } from 'react-bootstrap';
import Axios from "axios";
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";
import "./AddPart.css";

const getBasename = () => {
    return process.env.REACT_APP_BACK_END_URL;
};

export default class AddPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            denumire: "",
            cantitate: 0,
            cod: "",
            file: null,
            redirectToHome: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = {
            name: this.state.denumire,
            stock: this.state.cantitate,
            code: this.state.cod
        }

        Axios.post(`${getBasename()}/api/parts`, JSON.stringify(form),
            {
                headers: { "Content-Type": "application/json" }
            })
            .then((res) => {
                toast(res.data.message);
                this.setState({ redirectToHome: true })
            })
            .catch(error => {
                toast(error.response.data.message);
                console.log(error.response)
            });

    }

    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            <Row>
                <Col xl={6} lg={12} md={12} className="mx-auto">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Denumire</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="denumire"
                                    placeholder="Introduceti denumirea"
                                    onChange={e => this.handleChange(e)} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStock">
                                <Form.Label>Cantitate</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="cantitate"
                                    placeholder="Cantitate"
                                    onChange={e => this.handleChange(e)} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridCod">
                            <Form.Label>Cod</Form.Label>
                            <Form.Control
                                placeholder="6001541144"
                                name="cod"
                                onChange={e => this.handleChange(e)} />
                        </Form.Group>
                        <Form.Group controlId="formGridFile">

                            <Form.File id="formcheck-api-regular">
                                <Form.File.Label>Regular file input</Form.File.Label>
                                <Form.File.Input />
                            </Form.File>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => this.handleSubmit(e)}>
                            Salveaza piesa
                        </Button>
                    </Form>
                </Col>
            </Row >

        )
    };
}
