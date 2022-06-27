import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';

import { Home } from './pages/home/Home';
import { Parts } from './pages/parts/Parts';
import { Cars } from './pages/cars/Cars';
import { Login } from './pages/auth/Login';
import { CarProfile } from './pages/cars/car-profile/CarProfile';
import { PartProfile } from './pages/parts/part-profile/PartProfile';
import { NavigationBar } from './components/navigation-bar/NavigationBar';
import { GoogleApiProvider } from 'react-gapi';

import { GlobalContextProvide } from './global-context';

import 'react-toastify/dist/ReactToastify.css';

import './App.scss';

toast.configure();

function App() {
    const [isAuth, setIsAuth] = useState(true);

    const darkTheme = createTheme({
        typography: {
            fontFamily: 'Roboto'
        },
        palette: {
            primary: {
                main: '#4281A4'
            },
            secondary: {
                main: '#E6B89C'
            },
            tertiary: {
                main: '#FFFFFF'
            },
            error: {
                main: '#da3e52'
            },
            warning: {
                main: '#F2E94E'
            },
            info: {
                main: '#96e6b3' //'#42D9C8'
            }
        }
    });

    const triggerLogOut = () => {
        if (!localStorage.getItem('token')) {
            setIsAuth(false);
        }
    };

    useEffect(() => {
        triggerLogOut();
    }, []);

    return (
        <GlobalContextProvide>
            <ThemeProvider theme={darkTheme}>
                {isAuth && <NavigationBar triggerLogOut={triggerLogOut} />}

                <div className="app">
                    {!isAuth && <Navigate to="/login" />}

                    {/* DO NOT USE component like bellow in a Switch statement */}
                    <GoogleApiProvider
                        clientId={process.env.REACT_APP_GOOGLE_ID}>
                        <Routes>
                            {/* non private routes */}
                            <Route path="/" exact element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/cars" element={<Cars />} />
                            <Route
                                path="/car-profile"
                                element={<CarProfile />}
                            />
                            <Route path="/parts" element={<Parts />} />
                            <Route
                                path="/part-profile"
                                element={<PartProfile />}
                            />
                            {/* TODO: private routes */}
                        </Routes>
                    </GoogleApiProvider>
                </div>
            </ThemeProvider>
        </GlobalContextProvide>
    );
}

export default App;
