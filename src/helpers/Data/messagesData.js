import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebase = apiKeys.firebaseKeys.databaseURL;

cosnt getExistingMessages = uid => new Promise((resolve, reject) =>  {
  axios.get(`${firebase}/nutshel/messages.json?orderBy="uid"&equalTo="${uid}"`)
   .then((results) => {
    const messagesObject = results.data;
    const messageArray = [];
    if (messageObject !== null) {
      Object.keys(messageObject).forEach((messageId) => {
        messageObject[messageId].id = messageId;
        messageArray.push(messagesObject[messageId]);
      });
    }
    resolve(messageArray);
  })
  .catch((error) => {
    reject(error);
  });
});

export default getExistingMessages;
