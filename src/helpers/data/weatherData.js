import axios from 'axios';
import apiKeys from '../../../db/apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllZips = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const weatherObject = results.data;
      const weatherArray = [];
      if (weatherObject != null) {
        Object.keys(weatherObject).forEach((zipId) => {
          weatherObject[zipId].id = zipId;
          weatherArray.push(weatherObject[zipId]);
        });
      }
      resolve(weatherArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleZip = zipId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather/${zipId}.json`)
    .then((result) => {
      const singleZip = result.data;
      singleZip.id = zipId;
      resolve(singleZip);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteZipcode = idToDelete => axios.delete(`${firebaseUrl}/weather/${idToDelete}.json`);

const addZipcode = weatherObject => axios.post(`${firebaseUrl}/weather.json`, JSON.stringify(weatherObject));

const updateIsCurrent = (zipId, isCurrent) => axios.patch(`${firebaseUrl}/weather/${zipId}.json`, { isCurrent });

export default {
  getAllZips,
  getSingleZip,
  deleteZipcode,
  addZipcode,
  updateIsCurrent,
};
