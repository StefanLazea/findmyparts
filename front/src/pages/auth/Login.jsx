import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import Container from '@mui/material/Container';
import axios from "axios";
import './Login.scss';
export const Login = (props) => {
    let navigate = useNavigate();
    const handleLogin = (response) => {
        axios.post(`/auth/google`, {

            token: response.tokenId
        }, {
            "Content-Type": "application/json"
        }
        ).then((res) => {
            if (res.data.message === 'Success') {
                localStorage.setItem('token', res.data.token)
                navigate.push('/')
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
                    prompt="select_account"
                    cookiePolicy={'single_host_origin'}
                />
                <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_ID}
                    buttonText="Logout"
                    onLogoutSuccess={(response) => localStorage.clear()}
                    onFailure={(response) => console.log(response)}
                >
                </GoogleLogout>

            </div>
        </Container>
    );
}

