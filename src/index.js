import $ from 'jquery';
import 'bootstrap';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import './index.scss';


import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './helpers/authHelpers';
import eventsPage from './components/EventsPage/eventsPage';
import showAddEventForm from './components/AddEditEvents/addEditEvents';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  authHelpers.checkLoginStatus(eventsPage);
  loginButton();
  $('#show-event-form').on('click', showAddEventForm);
};

initializeApp();
