import React from "react";
import { Navbar, Nav, Item, Dropdown } from 'rsuite';
import ResponsiveNav from '@rsuite/responsive-nav';

export const NavBarInstance = ({ onSelect, activeKey, setActiveKey, ...props }) => {
    return (
        <Navbar {...props}>
            <Navbar.Brand href="#">RSUITE</Navbar.Brand>
            <Nav onSelect={onSelect} activeKey={activeKey}>
                <Nav.Item eventKey="1" >
                    Home
                </Nav.Item>
                <Nav.Item eventKey="2">News</Nav.Item>
                <Nav.Item eventKey="3">Products</Nav.Item>
                <Dropdown title="About">
                    <Dropdown.Item eventKey="4">Company</Dropdown.Item>
                    <Dropdown.Item eventKey="5">Team</Dropdown.Item>
                    <Dropdown.Item eventKey="6">Contact</Dropdown.Item>
                </Dropdown>
            </Nav>
            <Nav pullRight>
                <Nav.Item>Settings</Nav.Item>
            </Nav>
        </Navbar>

        // <ResponsiveNav activeKey={activeKey} onSelect={setActiveKey} appearance="tabs">

        //     <ResponsiveNav.Item key={'home'} eventKey={'home'}>
        //         Home
        //     </ResponsiveNav.Item>
        //     <ResponsiveNav.Item key={'home'} eventKey={'home'}>
        //         Home
        //     </ResponsiveNav.Item>
        // </ResponsiveNav>
    );
};