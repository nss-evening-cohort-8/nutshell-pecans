import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebase = apiKeys.firebaseKeys.databaseURL;

const getExistingMessages = () => new Promise((resolve, reject) => {
  axios.get(`${firebase}/messages.json`)
    .then((results) => {
      const messagesObject = results.data;
      const messageArray = [];
      if (messagesObject !== null) {
        Object.keys(messagesObject).forEach((messageId) => {
          messagesObject[messageId].id = messageId;
          messageArray.push(messagesObject[messageId]);
        });
      }
      resolve(messageArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteMessage = messageId => axios.delete(`${firebase}/messages/${messageId}.json`);

const addNewMessage = messageObject => axios.post(`${firebase}/messages.json`, JSON.stringify(messageObject));

export default { getExistingMessages, deleteMessage, addNewMessage };
