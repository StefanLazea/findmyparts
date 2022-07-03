import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
// import { useLocation } from 'react-router';
// import { Navigate } from 'react-router-dom';

import { addUserId, addUsersDetails, useGlobalContext } from 'global-context';
import LogoIcon from 'assets/icons/LogoIcon';
import axios from 'axios';
import { toast } from 'react-toastify';
import _ from 'lodash';

import styles from './Login.module.scss';
import { PageContainer } from 'components/page-container/PageContainer';

export const Login = () => {
    const { dispatch } = useGlobalContext();
    // const { state } = useLocation();
    const [isAuth, setIsAuth] = useState(false);

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
                    const userDetails = _.get(res, 'data.user', '');
                    setIsAuth(true);
                    //todo navigation
                    dispatch(addUserId(userId));
                    dispatch(addUsersDetails(userDetails));

                    // dispatch(addGapiInstance(gapi))
                }
                toast(res.data.message);
            });
    };
    return (
        <PageContainer>
            <div className={styles.loginContainer}>
                <div className={styles.logoContainer}>
                    <LogoIcon />
                    <span className={styles.title}>GasestePiesa.online</span>
                </div>
                <div className={styles.buttonsContainer}>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        buttonText="Log in with Google"
                        onSuccess={(response) => handleLogin(response)}
                        onFailure={(response) => handleLogin(response)}
                        prompt="select_account"
                        cookiePolicy={'single_host_origin'}
                        scopes={['calendar.events', 'calendar']}
                    />
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_ID}
                        buttonText="Logout"
                        onLogoutSuccess={() => localStorage.clear()}
                        onFailure={() => {}}></GoogleLogout>
                    {/* {isAuth && <Navigate to="/" />} */}
                </div>
            </div>
        </PageContainer>
    );
};
