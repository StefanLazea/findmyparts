import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  useHistory,
  Switch,
  Redirect
} from "react-router-dom";

import { Home } from './pages/home/Home';
import { Parts } from './pages/parts/Parts'
import { AuthPage } from './pages/auth/AuthPage';
import { Register } from './pages/auth/Register';
import { Login } from './pages/auth/Login';
import { toast } from 'react-toastify';
import { NavigationBar } from './components/navigation-bar/NavigationBar';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
  const [isAuth, setIsAuth] = useState(true);
  // const history = useHistory();

  const triggerLogOut = () => {
    // console.log('aici', localStorage.getItem('token'))
    if (!localStorage.getItem('token')) {
      setIsAuth(false)
    }
  }

  return (
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
          </div>
        </Switch>
      </BrowserRouter>
    </div >
  );
}

export default App;
