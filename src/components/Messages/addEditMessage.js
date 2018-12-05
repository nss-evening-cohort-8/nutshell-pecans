import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import messagesData from '../../helpers/data/messagesData';
import messageDisplay from './messageDisplay';

// add

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

// edit

const selectEditMessage = (e) => {
  const idToEdit = e.target.dataset.editId;
  messagesData.getSingleMessage(idToEdit)
    .then((singelMessage) => {
      console.log(singelMessage);
      $('#messageInputArea').val(singelMessage.message);
    })
    .catch((error) => {
      console.error('error in getting message to edit', error);
    });
};


// events

const addEditMessageEvents = () => {
  $('body').on('click', '#button-addon1', sendNewMessage);
  $('body').on('click', '.editMessageButton', selectEditMessage);
};

export default addEditMessageEvents;
