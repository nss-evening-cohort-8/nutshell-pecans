import $ from 'jquery';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import './index.scss';
import messageDisplay from './components/Messages/messageDisplay';
import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';

import initializeWeatherPage from './components/Weather/weatherComponent';
import initializeArticlesPage from './components/ArticlesPage/articlesPage';
import eventsPage from './components/EventsPage/eventsPage';
import buildAddForm from './components/AddEditArticles/addEditArticles';

const initializeUserApp = () => {
  eventsPage();
  initializeArticlesPage();
  messageDisplay();
  initializeWeatherPage();
};

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  authHelpers.checkLoginStatus(initializeUserApp);
  loginButton();
  $('body').on('click', '#add-articles', buildAddForm);
};

initializeApp();
