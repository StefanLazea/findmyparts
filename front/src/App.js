import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  useHistory,
  Switch,
  Redirect
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Home } from './pages/home/Home';
import { Parts } from './pages/parts/Parts'
import { Cars } from './pages/cars/Cars';
import { Register } from './pages/auth/Register';
import { Login } from './pages/auth/Login';
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
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <div>
              {isAuth && <NavigationBar triggerLogOut={triggerLogOut} />}
              <Route path="/home" exact component={Home} />
              <Route path="/parts" component={Parts} />
              <Route path="/cars" component={Cars} />
            </div>
          </Switch>
        </BrowserRouter>
      </div >
    </ThemeProvider>

  );
}

export default App;
