import React from 'react';
import '../Headers/Main Header/Sub Components/UserInfo/UserInfo.css'
import { auth } from '../../firebase';

const SignOutButton = () =>

  

  <button
    id='signoutbutton'
    type="button"
    onClick={() => {auth.doSignOut()}}
  >
    Log Out
  </button>

export default SignOutButton;
