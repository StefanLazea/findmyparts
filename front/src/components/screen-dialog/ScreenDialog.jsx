import React from 'react';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Typography
} from '@mui/material';

import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const ScreenDialog = (props) => {
    const { open, setOpen } = props;
    const handleClose = () => setOpen(false);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        sx={{ ml: 2, flex: 1 }}
                        variant="h6"
                        component="div">
                        {props.title}
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={props.onClickInfo}
                        aria-label="close">
                        <InfoIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                {props.description && (
                    <DialogContentText>{props.description}</DialogContentText>
                )}
                {props.children}
            </DialogContent>
            <DialogActions>{props.footerActions}</DialogActions>
        </Dialog>
    );
};
