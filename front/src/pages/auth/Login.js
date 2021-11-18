import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import axios from "axios";
export const Login = (props) => {
    let history = useHistory();

    const handleLogin = (response) => {
        console.log('googleData', response);
        axios.post("http://localhost:3005/api/auth/google", {

            token: response.tokenId
        }, {
            "Content-Type": "application/json"
        }
        ).then((res) => {
            console.log({ res })
            if (res.data.message === 'Success') {
                localStorage.setItem('token', res.data.token)
                history.push('/')
            }
            toast(res.data.message);
        });

    }
    return (
        <GoogleLogin
            clientId="142016303094-jsoj7h3eeavgf9ne9ij9ugb6k48m9qa2.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={(response) => handleLogin(response)}
            onFailure={(response) => handleLogin(response)}
            cookiePolicy={'single_host_origin'}
        />
    );
}

