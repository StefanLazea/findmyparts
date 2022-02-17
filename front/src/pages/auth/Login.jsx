import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import Container from '@mui/material/Container';
import axios from "axios";
import './Login.scss';
export const Login = (props) => {
    let history = useHistory();
    console.log(process.env.REACT_APP_GOOGLE_ID)

    const handleLogin = (response) => {
        // console.log('googleData', response);
        axios.post(`/auth/google`, {

            token: response.tokenId
        }, {
            "Content-Type": "application/json"
        }
        ).then((res) => {
            // console.log({ res })
            if (res.data.message === 'Success') {
                localStorage.setItem('token', res.data.token)
                history.push('/')
            }
            toast(res.data.message);
        });

    }
    return (
        <Container maxWidth="lg">
            <div className="login-container">
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_ID}
                    buttonText="Log in with Google"
                    onSuccess={(response) => handleLogin(response)}
                    onFailure={(response) => handleLogin(response)}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </Container>
    );
}

