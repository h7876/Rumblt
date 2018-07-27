import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import { auth, db } from '../../firebase';
import axios from 'axios';

import './Signup.css'
export const DASHBOARD = '/dashboard';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

// const INITIAL_STATE = {
//   name: '',
//   username: '',
//   email: '',
//   userid: '',
//   blogtitle:'',
//   passwordOne: '',
//   passwordTwo: ''
// };

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      email: '',
      userid: '',
      blogtitle:'',
      userimg: '',
      passwordOne: '',
      passwordTwo: ''
    };
  }



  onSubmit = (event) => {
    const {
      name,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        db.doCreateUser(authUser.user.uid, name, email)
          .then(() => {
            //this.setState(() => ({ ...INITIAL_STATE }));
            this.setState({userid: authUser.user.uid});
          }).then( () => {
            let {userid, name, username, blogtitle, userimg} = this.state;
            axios.post('/api/newuser/', {userid, name, username, blogtitle, userimg}).then( () => {
              ('user made good si')
            }).then(() => {window.location.href = '/#/dashboard'})
          })
      })
      .catch(error => {
        console.log(error);
      });
      
    event.preventDefault();

  }

 
  render() {
    const {
      name,
      email,
      username,
      blogtitle,
      userimg,
      passwordOne,
      passwordTwo,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      name === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={name}
          onChange={event => this.setState(updateByPropertyName('name', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        
        <input 
        value={username}
        onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
        type='text'
        placeholder='Username'
        />
        
        <input
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        
        <input 
        value={blogtitle}
        onChange={event => this.setState(updateByPropertyName('blogtitle', event.target.value))}
        type='text'
        placeholder='Name your blog!'
        />
        
        <input value={userimg}
        onChange={event => this.setState(updateByPropertyName('userimg', event.target.value))}
        type='text'
        placeholder='Profile image'
        />
        
        <input
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        
        <input
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {/* { error && <p>{error.message}</p> } */}
      </form>
    );
  }
}
export default SignUpForm;