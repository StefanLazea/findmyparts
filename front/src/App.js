import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { Home } from './pages/home/Home';
import { Parts } from './pages/parts/Parts'
import { AuthPage } from './pages/auth/AuthPage';
import { Register } from './pages/auth/Register';
import { Login } from './pages/auth/Login';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { NavigationBar } from './components/navigation-bar/NavigationBar';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const checkTokenValidity = () => {
  // console.log(localStorage.getItem('token'));
  return true;
}

function App() {
  const isAuth = checkTokenValidity();
  return (
    <div className="app">
      {isAuth && <NavigationBar />}
      <Container className='page-container'>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/parts" component={Parts} />
          <Route path="/cars" component={Parts} />
          <Route path="/papers" component={Parts} />
          <Route path="/register" component={Register} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/login" component={Login} />
        </Router>
      </Container>
    </div>
  );
}

export default App;
