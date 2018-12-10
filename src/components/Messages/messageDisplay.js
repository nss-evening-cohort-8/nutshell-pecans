import $ from 'jquery';
import moment from 'moment';
import './messageDisplay.scss';
import firebase from 'firebase';
import 'firebase/auth';
import messageData from '../../helpers/data/messagesData';


// Loading Message display

const messageStringBuilder = () => {
  const printString = `
    <div id="newMessages"></div>
    <h1 class="events-header text-center">MESSAGES</h1>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button class="btn btn-secondary sendMessage" type="button" id="button-addon1">SEND</button>
      </div>
      <input id="messageInputArea" type="text" class="form-control" placeholder="" aria-describedby="button-addon1">
    </div>`;
  $('#messages').html(printString);
};

const gettingMessages = () => {
  messageData.getExistingMessages()
    .then((messagesArray) => {
      messageStringBuilder();
      let messages = '';
      messagesArray.forEach((message) => {
        const time = moment(message.timestamp).calendar();
        messages += `<div>
        <strong>${message.username}:</strong> ${message.message} <small>${time}</small>`;
        if (message.uid === firebase.auth().currentUser.uid) {
          messages += `
            <input class="editMessageButton pt-1 ml-2" data-edit-id=${message.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="15px" height="27px"></input>
            <input class="deleteMessageButton pt-1" data-delete-id=${message.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="15px" height="25px"></input>
          </div>`;
        } else {
          messages += '</div>';
        }
      });
      $('#newMessages').html(messages);
    })
    .catch((error) => {
      console.error('error in getting messages', error);
    });
};

// Message UI and Manipulation

const deleteMessage = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  messageData.deleteMessage(idToDelete)
    .then(() => {
      gettingMessages();
    })
    .catch((error) => {
      console.error('error in deleting message', error);
    });
};

const bindMessageEvents = () => {
  $('body').on('click', '.deleteMessageButton', deleteMessage);
};

const initializeMessages = () => {
  gettingMessages();
  bindMessageEvents();
};


export default initializeMessages;
