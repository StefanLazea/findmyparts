import React from 'react';

import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export const AuthPage = (props) => {
    const history = useHistory();
    return <>
        <div>Auth page</div>
        <Button variant="contained" onClick={() => history.push('/register')}>Switch to register</Button>;
    </>;
}

