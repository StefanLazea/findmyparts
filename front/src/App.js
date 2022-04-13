import React, { useState } from 'react';
import {
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Home } from './pages/home/Home';
import { Parts } from './pages/parts/Parts'
import { FindPart } from './pages/parts/find-part/FindPart'
import { Cars } from './pages/cars/Cars';
import { Register } from './pages/auth/Register';
import { Login } from './pages/auth/Login';
import { CarProfile } from './pages/cars/car-profile/CarProfile';

import { toast } from 'react-toastify';
import { NavigationBar } from './components/navigation-bar/NavigationBar';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContextProvide } from "./global-context"
toast.configure();

function App() {
  const [isAuth, setIsAuth] = useState(true);

  const darkTheme = createTheme({
    palette: {
      // mode: 'dark',
      primary: {
        main: '#1B2F33',
      },
      secondary: {
        main: '#326771'
      },
      tertiary: {
        main: '#FFFFFF'
      },
      error: {
        main: "#D81C2C"
      },
      warning: {
        main: "#FFD23F"
      },
      info: {
        main: "#42D9C8"
      },
    },
  });

  const triggerLogOut = () => {
    if (!localStorage.getItem('token')) {
      setIsAuth(false)
    }
  }

  return (
    <GlobalContextProvide >
      <ThemeProvider theme={darkTheme}>
        {isAuth && <NavigationBar triggerLogOut={triggerLogOut} />}
        <div className="app">
          {!isAuth && <Navigate to='/login' />}

          {/* DO NOT USE component like bellow in a Switch statement */}
          {/* <Container> */}
          <Routes>
            {/* non private routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/find-part" element={<FindPart />} />
            {/* TBD is this remains like this */}
            <Route path="/car-profile" element={<CarProfile />} />

            {/* TODO: private routes */}
            <Route path="/home" exact element={<Home />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/cars" element={<Cars />} />
          </Routes>
          {/* </Container> */}
        </div >
      </ThemeProvider>
    </GlobalContextProvide>
  );
}

export default App;
