import React from 'react';
import './Home.scss'
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';

export const Home = (props) => {

    const handleLogin = async googleData => {
        console.log('googleData', googleData);
        //todo: change
        const res = await fetch("http://localhost:3005/api/auth/google", {
            method: "POST",
            body: JSON.stringify({
                token: googleData.tokenId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json()
        console.log(data)
        //todo: validation on res
        toast(data.message);
        // store returned user somehow
    }
    return (
        // <GoogleLogin
        //     clientId="142016303094-jsoj7h3eeavgf9ne9ij9ugb6k48m9qa2.apps.googleusercontent.com"
        //     buttonText="Login"
        //     onSuccess={responseGoogle}
        //     onFailure={responseGoogle}
        //     cookiePolicy={'single_host_origin'}
        // />
        <GoogleLogin
            clientId="142016303094-jsoj7h3eeavgf9ne9ij9ugb6k48m9qa2.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleLogin}
            cookiePolicy={'single_host_origin'}
        />
    );
}

