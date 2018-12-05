import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import messagesData from '../../helpers/data/messagesData';
import messageDisplay from './messageDisplay';

const messageToSend = () => {
  const message = {
    uid: authHelpers.getCurrentUid(),
    message: $('#messageInputArea').val(),
    timestamp: Date.now(),
    isEdited: false,
  };
  return message;
};

const sendNewMessage = () => {
  const newMessage = messageToSend();
  messagesData.addNewMessage(newMessage)
    .then(() => {
      messageDisplay();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const addEditMessageEvents = () => {
  $('body').on('click', '#button-addon1', sendNewMessage);
};

export default addEditMessageEvents;
