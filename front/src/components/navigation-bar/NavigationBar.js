import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { MdHistoryEdu } from 'react-icons/md';
import {
    Link,
    useHistory
} from 'react-router-dom';

export const NavigationBar = (props) => {

    const history = useHistory();

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to='/home'>Cauta piesa</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Link to="/home">Acasa</Link>
                        <Link to='/parts'>Piese</Link>
                        <Link to="/login">Login</Link>
                        <Link onClick={() => props.triggerLogOut()}>Log out</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container >
        </Navbar >
    );
}

