import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';

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
import axios from 'axios';
import { LABELS } from 'constants/labels';
import ProtectedRoute from 'components/ProtectedRoute';

toast.configure();

function App() {
    const [isAuth, setIsAuth] = useState(true);
    const navigate = useNavigate();

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
        // localStorage.removeItem('token');
        setIsAuth(false);
        localStorage.clear();
        navigate('/login');
        console.log('logout');
    };

    const handleSuccessLogin = () => {
        navigate('/cars');
        console.log('bingo');
    };

    //move logic to nav bar as it is under global text provider
    useEffect(() => {
        const token = localStorage.getItem('token');
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        if (!token) {
            setIsAuth(false);
        } else {
            axios
                .get('/google/token/validation', {
                    headers: {
                        Authorization: token
                    },
                    cancelToken: source.token
                })
                .then(() => {
                    setIsAuth(true);
                })
                .catch(() => {
                    setIsAuth(false);
                    toast.error(LABELS.forbiddenMessage, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                    });
                });
        }
        return () => source.cancel();
    }, [localStorage]);

    return (
        <GlobalContextProvide>
            <ThemeProvider theme={darkTheme}>
                {isAuth && <NavigationBar triggerLogOut={triggerLogOut} />}

                <div className="app">
                    {/* DO NOT USE component like bellow in a Switch statement */}
                    <GoogleApiProvider
                        clientId={process.env.REACT_APP_GOOGLE_ID}>
                        <Routes>
                            {/* non private routes */}
                            <Route
                                path="/"
                                exact
                                element={
                                    <ProtectedRoute isAuth={isAuth}>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <Login onSuccess={handleSuccessLogin} />
                                }
                            />
                            <Route
                                path="/cars"
                                element={
                                    <ProtectedRoute isAuth={isAuth}>
                                        <Cars />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/car-profile"
                                element={
                                    <ProtectedRoute isAuth={isAuth}>
                                        <CarProfile />{' '}
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/parts" element={<Parts />} />
                            <Route
                                path="/part-profile"
                                element={
                                    <ProtectedRoute isAuth={isAuth}>
                                        <PartProfile />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </GoogleApiProvider>
                </div>
            </ThemeProvider>
        </GlobalContextProvide>
    );
}

export default App;
