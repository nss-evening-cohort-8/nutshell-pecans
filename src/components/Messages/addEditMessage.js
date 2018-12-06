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
      $('#button-addon1').toggleClass('sendMessage sendEditedMessage');
      $('#button-addon1').html('Edit');
      $('#button-addon1').attr('data-single-edit-id', `${singelMessage.id}`);
    })
    .catch((error) => {
      console.error('error in getting message to edit', error);
    });
};

const updateMessage = (e) => {
  const messageObject = messageToSend();
  const messageId = e.target.dataset.singleEditId;
  messagesData.editMessage(messageObject, messageId)
    .then(() => {
      $('#button-addon1').toggleClass('sendEditedMessage sendMessage');
      $('#button-addon1').html('Send');
      $('#button-addon1').removeAttr('data-single-edit-id');
      messageDisplay();
    })
    .catch((error) => {
      console.error('error in editing message', error);
    });
};


// events

const addEditMessageEvents = () => {
  $('body').on('click', '.sendMessage', sendNewMessage);
  $('body').on('click', '.editMessageButton', selectEditMessage);
  $('body').on('click', '.sendEditedMessage', updateMessage);
};

export default addEditMessageEvents;
