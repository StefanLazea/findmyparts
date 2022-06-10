import React, { useRef } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import { GoogleLogout } from 'react-google-login';

import Container from '@mui/material/Container';
import { addUserId, useGlobalContext } from 'global-context';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleOneTapLogin } from '@react-oauth/google';

import axios from 'axios';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { useGoogleLogin } from '@react-oauth/google';
import { hasGrantedAnyScopeGoogle } from '@react-oauth/google';

import './Login.scss';
import { useState } from 'react';
export const Login = () => {
    const [token, setToken] = useState('');
    const { dispatch } = useGlobalContext();
    // const testTap = useGoogleOneTapLogin({
    //     onSuccess: (credentialResponse) => {
    //         console.log(cz);
    //     }
    // });
    const handleLogin = (response) => {
        axios
            .post(
                `/auth/google`,
                {
                    token: response.tokenId
                },
                {
                    'Content-Type': 'application/json'
                }
            )
            .then((res) => {
                if (res.data.message === 'Success') {
                    localStorage.setItem('token', res.data.token);
                    const userId = _.get(res, 'data.user.id', '');
                    //todo navigation
                    dispatch(addUserId(userId));
                    // dispatch(addGapiInstance(gapi))
                }
                toast(res.data.message);
            });
    };
    const googleLogin = useGoogleLogin({
        flow: 'implicit',
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
            // Send the google token to the backend to get access and refresh tokens
        },
        onError: (errorResponse) => console.log(errorResponse)
    });
    const hasAccess = hasGrantedAnyScopeGoogle(
        token,
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar'
    );
    console.log(hasAccess);
    return (
        <Container maxWidth="lg">
            {/* <div className="login-container">test</div> */}
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    setToken(credentialResponse.credential);
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </Container>
    );
};
