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

const getSingleEvent = eventId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events/${eventId}.json`)
    .then((result) => {
      const singleEvent = result.data;
      singleEvent.id = eventId;
      resolve(singleEvent);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteEvent = idToDelete => axios.delete(`${apiKeys.firebaseKeys.databaseURL}/events/${idToDelete}.json`);

const addNewEvent = eventObject => axios.post(`${firebaseUrl}/events.json`, JSON.stringify(eventObject));

const updateEvent = (eventObject, eventId) => axios.put(`${firebaseUrl}/events/${eventId}.json`, JSON.stringify(eventObject));

export default {
  getAllEvents,
  deleteEvent,
  getSingleEvent,
  addNewEvent,
  updateEvent,

};
