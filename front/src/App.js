import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
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
    <ThemeProvider theme={darkTheme}>

      <div className="app">

        {!isAuth && <Redirect to='/login' />}

        <BrowserRouter basename='/'>
          {/* DO NOT USE component like bellow in a Switch statement */}
          {isAuth && <NavigationBar triggerLogOut={triggerLogOut} />}

          <Switch>
            {/* non private routes */}

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/find-part" component={FindPart} />
            {/* TBD is this remains like this */}
            <Route path="/car-profile" component={CarProfile} />


            {/* TODO: private routes */}
            <Route path="/home" exact component={Home} />
            <Route path="/parts" component={Parts} />
            <Route path="/cars" component={Cars} />



          </Switch>
        </BrowserRouter>
      </div >
    </ThemeProvider>

  );
}

export default App;
