import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/data/weatherData';

const printAllZips = (weatherArray) => {
  let cardString = '';
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
  console.log(idToDelete);
  weatherData.deleteZipcode(idToDelete)
    .then(() => {
      console.log('im here');
      weatherPage();
      $('#weather').html('');
    })
    .catch((error) => {
      console.error('error in deleting zipcode', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-weather-btn', deleteZips);
};

const initializeWeatherPage = () => {
  weatherPage();
  bindEvents();
};

export default initializeWeatherPage;
