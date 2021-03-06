import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeUserApp) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#eventsContainer').show();
      $('#messages').show();
      $('#articles').show();
      $('#weather').show();
      $('#navbar-button-logout').show();
      initializeUserApp();
    } else {
      $('#eventsContainer').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#weather').hide();
      $('#auth').show();
      $('#navbar-button-logout').hide();
      $('#allArticlesContainer').hide();
      $('#newMessages').hide();
      $('messageContainer').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
