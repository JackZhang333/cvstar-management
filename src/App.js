import React from 'react';
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import {  Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import NotFound from './pages/NotFound';

function PrivateRoute({component:Component,...rest}){
  return <Route {...rest} render = {
    (props) => store.getState().isLogin ? <Component {...props}/>:
    <Redirect to={{
      pathname:'/',
      state:{
        from:props.location.pathname
      }
    }}/>
  }/>
}
function App() {
  return (
    <Provider store = {store}>
    <BrowserRouter>
      <div >
        <Switch>
          <PrivateRoute path='/home' component={Home} />
          <Route path='/login' component={Login} />
          <Route exact path='/' component={Login} />
          <Route component = {NotFound}/>
        </Switch>
      </div>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
