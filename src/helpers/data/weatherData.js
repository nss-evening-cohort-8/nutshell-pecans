import axios from 'axios';
import apiKeys from '../../../db/apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllZips = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/weather.json`)
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

export default { getAllZips };
