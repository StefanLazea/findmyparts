import React from 'react';

// import { Button, } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const AuthPage = (props) => {
    const history = useHistory();
    return <>
        <div>Auth page</div>
        {/* <Button variant="outline-primary" onClick={() => history.push('/register')}>Switch to register</Button> */}
    </>;
}

