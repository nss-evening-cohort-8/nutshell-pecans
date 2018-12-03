import $ from 'jquery';
import './navbar.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import logo from './logo.png';

const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        console.log('you logged out');
      }).catch((err) => {
        console.error('you are still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-dashboard') {
      $('#auth').hide();
      $('#events').show();
      $('#messages').show();
      $('#articles').show();
      $('#weather').show();
    } else {
      $('#auth').show();
      $('#events').hide();
      $('#messages').hide();
      $('#articles').hide();
      $('#weather').hide();
    }
  });
};

const createNavbar = () => {
  const domString = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><img src="${logo}"/></a>
     
      <a id="navbar-button-logout" class="nav-link">LOGOUT</a>
      <a id="navbar-button-dashboard" class="nav-link">DASHBOARD</a>
    
      </div>
    </nav>
  `;
  $('#navbar').html(domString);
  navbarEvents();
};

export default createNavbar;
