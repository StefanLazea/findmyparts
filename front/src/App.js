import React from 'react';
import './App.scss';
import { Home } from './pages/home/Home';
import { Parts } from './pages/parts/Parts'

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/parts" component={Parts} />
    </Router>
  );
}

export default App;
