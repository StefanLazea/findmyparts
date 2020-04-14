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

    handleChangeFile = (e) => {
        this.setState({
            file: e.target.files[0],
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = {
            name: this.state.denumire,
            stock: this.state.cantitate,
            code: this.state.cod
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        let formData = new FormData();    //formdata object
        formData.append('name', form.name);
        formData.append('stock', form.stock);
        formData.append('code', form.code);
        formData.append('image', this.state.file);

        Axios.post(`${getBasename()}/api/parts`, formData, config)
            .then(response => {
                toast(response.data.message);
                this.setState({ redirectToHome: true })
            })
            .catch(error => {
                if (error.response !== undefined) {
                    toast(error.response.data.message)
                }
                else {
                    toast("A aparut o problema. Mai incercati o data!");
                }
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
                                <Form.File.Input name="file" onChange={(e) => this.handleChangeFile(e)} />
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
