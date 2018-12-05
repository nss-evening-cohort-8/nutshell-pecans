import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/data/weatherData';
import buildAddForm from './addEditWeather';

const printAllZips = (weatherArray) => {
  let cardString = '';
  cardString += '<button id="addZipBtn" class="btn btn-info">Add New Zipcode</button>';
  weatherArray.forEach((weather) => {
    cardString += `
      <div class="card">
        <div class="card-body">
          <h5>${weather.zipcode}</h5>
          <button class="btn btn-danger delete-weather-btn" data-weather-delete-id=${weather.id}>Delete</button>
        </div>
      </div>
      `;
    $('#weather').html(cardString);
  });
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getAllZips(uid)
    .then((weatherArray) => {
      printAllZips(weatherArray);
    })
    .catch((error) => {
      console.error('error in getting weather', error);
    });
};

const deleteZips = (e) => {
  const idToDelete = e.target.dataset.weatherDeleteId;
  weatherData.deleteZipcode(idToDelete)
    .then(() => {
      weatherPage();
      $('#weather').html('');
    })
    .catch((error) => {
      console.error('error in deleting zipcode', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-weather-btn', deleteZips);
  $('body').on('click', '#addZipBtn', buildAddForm);
};

const initializeWeatherPage = () => {
  weatherPage();
  bindEvents();
};

export default initializeWeatherPage;
