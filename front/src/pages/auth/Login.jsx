import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import Container from '@mui/material/Container';
import { addUserId, useGlobalContext } from "global-context"

import axios from "axios";
import { toast } from 'react-toastify';
import _ from 'lodash';

import './Login.scss';
export const Login = (props) => {
    const { state: { userId }, dispatch } = useGlobalContext();
    useEffect(() => { console.log(userId) }, [userId])
    const handleLogin = (response) => {
        axios.post(`/auth/google`, {

            token: response.tokenId
        }, {
            "Content-Type": "application/json"
        }
        ).then((res) => {
            if (res.data.message === 'Success') {
                localStorage.setItem('token', res.data.token)
                const userId = _.get(res, 'data.user.id', '');
                //todo navigation
                dispatch(addUserId(userId))
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

