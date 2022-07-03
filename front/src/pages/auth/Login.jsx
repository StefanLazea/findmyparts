import React from 'react';
import { GoogleLogin } from 'react-google-login';

import { addUserId, addUsersDetails, useGlobalContext } from 'global-context';
import LogoIcon from 'assets/icons/LogoIcon';
import axios from 'axios';
import { toast } from 'react-toastify';
import _ from 'lodash';

import styles from './Login.module.scss';
import { PageContainer } from 'components/page-container/PageContainer';
import { LABELS } from 'constants/labels';

export const Login = ({ onSuccess = () => {} }) => {
    const { dispatch } = useGlobalContext();

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
                    dispatch(addUserId(userId));
                    dispatch(addUsersDetails(userDetails));
                    console.log('aici');
                    onSuccess();
                }
                toast(res.data.message);
            })
            .catch(() => {
                toast.error(LABELS.authFailed, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
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
                </div>
            </div>
        </PageContainer>
    );
};
