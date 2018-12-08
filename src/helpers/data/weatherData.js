import axios from 'axios';
import apiKeys from '../../../db/apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;
const weatherKey = apiKeys.weatherbit.apiKey;

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

// const getSingleZip = zipId => new Promise((resolve, reject) => {
//   axios.get(`${firebaseUrl}/weather/${zipId}.json`)
//     .then((result) => {
//       const singleZip = result.data;
//       singleZip.id = zipId;
//       resolve(singleZip);
//     })
//     .catch((error) => {
//       reject(error);
//     });
// });

const getWeatherbit = zipcode => new Promise((resolve, reject) => {
  axios.get(`https://api.weatherbit.io/v2.0/current?key=${weatherKey}&postal_code=${zipcode}&country=US&units=I`)
    .then((result) => {
      if (result.data[0] === '') {
        resolve('no data available');
      } else {
        const apiData = result.data.data[0];
        resolve(apiData);
      }
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
  getWeatherbit,
  deleteZipcode,
  addZipcode,
  updateIsCurrent,
};
