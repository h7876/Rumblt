//Header
//Footer
//Feed
//Chat Display
//Random Post
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import withAuthorization from '../../withAuthorization';
import MainHeader from '../Headers/Main Header/MainHeader'
import '../Headers/Login Header/LoginHeader.css'
import SignOutButton from '../Login/signOut';

const prevDashboard = ({ authUser}) => (
    <div>
      <MainHeader/>
    <h1>User: {authUser.uid}</h1>
    <h1>Email: {authUser.email}</h1>
    <h1>Name: </h1>
    <br/>
    <SignOutButton/>
    </div>
)
const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });
  
  const authCondition = (authUser) => !!authUser;
  
  export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
  )(prevDashboard);