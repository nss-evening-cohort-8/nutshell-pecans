import $ from 'jquery';
import 'bootstrap';
import firebase from 'firebase/app';
import apiKeys from '../db/apiKeys.json';
import './index.scss';
import messageDisplay from './components/Messages/messageDisplay';
import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';
import buildAddForm from './components/AddEditEvents/addEditEvents';
import initializeWeatherPage from './components/Weather/weatherComponent';
import initializeArticlesPage from './components/ArticlesPage/articlesPage';
import eventsPage from './components/EventsPage/eventsPage';
import buildAddArticleForm from './components/AddEditArticles/addEditArticles';
import addEditMessageEvents from './components/Messages/addEditMessage';
import buildZipForm from './components/Weather/addEditWeather';

const initializeUserApp = () => {
  eventsPage();
  initializeArticlesPage();
  messageDisplay();
  addEditMessageEvents();
  initializeWeatherPage();
  $('body').on('click', '#buildEventInput', buildAddForm);
  $('body').on('click', '#addZipBtn', buildZipForm);
};

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  authHelpers.checkLoginStatus(initializeUserApp);
  loginButton();
  $('body').on('click', '#add-articles', buildAddArticleForm);
};

initializeApp();
