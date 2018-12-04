import $ from 'jquery';
import './messageDisplay.scss';
import messageData from '../../helpers/data/messagesData';

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
        messages += `<div>${message.message}</div>`;
      });
      $('#newMessages').html(messages);
    })
    .catch((error) => {
      console.error('error in getting messages', error);
    });
};

export default gettingMessages;
