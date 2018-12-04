// import $ from 'jquery';
import 'bootstrap';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import './index.scss';
import messageDisplay from './components/Messages/messageDisplay';


import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  authHelpers.checkLoginStatus();
  loginButton();
  messageDisplay();
};

initializeApp();
