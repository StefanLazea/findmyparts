import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { BODY_STYLE_VARIANTS, FUEL_VARIANTS } from '../mock.js'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    Checkbox,
    MenuItem,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Typography
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AddDocumentDialog = (props) => {
    const { open, setOpen } = props;
    const handleClose = () => setOpen(false);
    const formRef = useRef();

    const saveDocument = (values) => {
        console.log(values)
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {props.title}
                    </Typography>

                </Toolbar>
            </AppBar>
            <DialogContent>
                {props.description &&
                    <DialogContentText>
                        {props.description}
                    </DialogContentText>
                }
                {props.children}
            </DialogContent>
            <DialogActions>
                {props.footerActions}
            </DialogActions>
        </Dialog>
    );
}