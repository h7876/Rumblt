// eslint-disable-next-line
import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './Components/DashBoard/Dashboard';
import Explore from './Components/Explore/Explore';
import Login from './Components/Login/Login';
import Profile from './Components/Profile/Profile';
import onClickLogin from './Components/Login/onClickLogin';
import './App.css';
import SignUpForm from './Components/Signup/Signup';
import withAuthentication from './withAuthentication';

const App = () => {
    return(
      <div className="App">
     
       <HashRouter>
         <Switch>
           <Route path='/' component={Login} exact/>
           <Route path='/dashboard' component={Dashboard}/>
           <Route path='/explore' component={Explore}/>
           <Route path='/profile/:userid' component={Profile}/>
           <Route path='/signin' component={onClickLogin}/>
           <Route path ='/signup' component={SignUpForm}/>
         </Switch>
       </HashRouter>
     
      </div>
    )
};

export default withAuthentication(App);
