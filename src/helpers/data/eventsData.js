import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEvents = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const eventsObject = results.data;
      const eventsArray = [];
      if (eventsObject !== null) {
        Object.keys(eventsObject).forEach((eventId) => {
          eventsObject[eventId].id = eventId;
          eventsArray.push(eventsObject[eventId]);
        });
      }
      resolve(eventsArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteEvent = idToDelete => axios.delete(`${apiKeys.firebaseKeys.databaseURL}/events/${idToDelete}.json`);

export default {
  getAllEvents,
  deleteEvent,

};
