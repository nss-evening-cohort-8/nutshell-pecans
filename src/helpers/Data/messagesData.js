import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebase = apiKeys.firebaseKeys.databaseURL;

const getExistingMessages = uid => new Promise((resolve, reject) => {
  axios.get(`${firebase}/messages.json?orderBy="uid"&equalTo="${uid}"`)
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

export default { getExistingMessages };
