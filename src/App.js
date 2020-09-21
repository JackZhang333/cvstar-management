import React from 'react';
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import {  Route, Switch, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div >
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
