import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeEventsPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#auth').hide();
      $('#events').show();
      $('#messages').show();
      $('#articles').show();
      $('#weather').show();
      $('#navbar-button-logout').show();
      initializeEventsPage();
    } else {
      $('#events').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#weather').hide();
      $('#auth').show();
      $('#navbar-button-logout').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
