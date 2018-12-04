import $ from 'jquery';
import './messageDisplay.scss';
import messageData from '../../helpers/data/messagesData';

// Loading Message display

const messageStringBuilder = () => {
  const printString = `
    <div id="newMessages"></div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <button class="btn btn-secondary" type="button" id="button-addon1">Send</button>
      </div>
      <input id="messageInputArea" type="text" class="form-control" placeholder="" aria-describedby="button-addon1">
    </div>
    <button id="expandMessages" type="button" class="btn btn-sm btn-light ml-auto">Expand</button>`;
  $('#messages').html(printString);
};

const gettingMessages = () => {
  messageData.getExistingMessages()
    .then((messagesArray) => {
      messageStringBuilder();
      let messages = '';
      messagesArray.forEach((message) => {
        messages += `<div>
        <strong>${message.uid}:</strong> ${message.message} <small>${message.timestamp}</small>
        <input class="editMessageButton pt-1 ml-2" data-edit-id=${message.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="15px" height="27px"></input>
        <input class="deleteMessageButton pt-1" data-delete-id=${message.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="15px" height="25px"></input>
        </div>`;
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
