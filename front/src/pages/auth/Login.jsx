import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import Container from '@mui/material/Container';
import { addUserId, useGlobalContext } from 'global-context';
import { useGoogleApi } from 'react-gapi';

import axios from 'axios';
import { toast } from 'react-toastify';
import _ from 'lodash';

import './Login.scss';
export const Login = () => {
    const { dispatch } = useGlobalContext();
    // const gapi = useGoogleApi({
    //     discoveryDocs: [
    //         'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    //     ],
    //     scopes: [
    //         'https://www.googleapis.com/auth/calendar.events',
    //         'https://www.googleapis.com/auth/calendar'
    //     ]
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
                    onLogoutSuccess={() => localStorage.clear()}
                    onFailure={(response) =>
                        console.log(response)
                    }></GoogleLogout>
            </div>
        </Container>
    );
};
