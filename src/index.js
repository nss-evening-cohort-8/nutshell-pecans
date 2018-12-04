// import $ from 'jquery';
import 'bootstrap';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import './index.scss';


import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';

import initializeWeatherPage from './components/Weather/weatherComponent';
import initializeArticlesPage from './components/ArticlesPage/articlesPage';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  authHelpers.checkLoginStatus(initializeArticlesPage, initializeWeatherPage);
  loginButton();
};

initializeApp();
