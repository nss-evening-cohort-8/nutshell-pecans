import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/data/weatherData';

const zipStringBuilder = (weatherArray) => {
  let zipsBuilder = '<h3>Weather</h3>';
  weatherArray.forEach((weather) => {
    zipsBuilder += `<h5>${weather.zipcode}`;
  });
  return zipsBuilder;
};

const printAllZips = (weather) => {
  let cardString = `
      <div class="card">
        <div class="card-body">
          <button class="btn btn-danger delete-weather-btn" data-weather-delete-id=${weather.id}>X</button>
          <div class="form-check form-check-inline">
          <label class="form-check-label" for="inlineCheckbox1">Current zipcode?</label>
            <input class="form-check-input checkIsCurrent" type="checkbox" id="${weather.id}">
            <div class="zipContainer">${zipStringBuilder(weather)}</div>
          </div>
        </div>
      </div>
      `;
  $('#weather').html(cardString);
  if (weather.isCurrent) {
    console.log('inside zip check');
    $('.checkIsCurrent').attr('checked', true);
  }
  cardString += '<button id="addZipBtn" class="btn btn-info">Add New Zipcode</button>';
  $('#weather').html(cardString);
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

const updateIsCurrent = (e) => {
  const zipId = e.target.id;
  const isCurrent = e.target.checked;
  weatherData.updateIsCurrent(zipId, isCurrent)
    .then(() => {
    })
    .catch((err) => {
      console.error('error in updating current zip', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-weather-btn', deleteZips);
  $('body').on('click', '.checkIsCurrent', updateIsCurrent);
};

const initializeWeatherPage = () => {
  weatherPage();
  bindEvents();
};

export default initializeWeatherPage;
