import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/data/weatherData';
import './weatherComponent.scss';

const zipStringBuilder = (weather) => {
  let zipsBuilder = '<h3>Weather</h3>';
  weather.forEach((zipcodes) => {
    zipsBuilder += `<h5>${zipcodes.zipcode}`;
  });
  return zipsBuilder;
};

const printSingleZip = (weather, zipId, isCurrent) => {
  let cardString = `
      <div class="card">
        <div class="card-body">
        <h1 class="events-header text-center">WEATHER</h1>

          <div class="zipContainer">
            <h5>${weather.city_name}, ${weather.state_code}</h5>
            <img src="https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png"></img>
            <p>${weather.temp}</p>
            <p>${weather.weather.description}</p>
          </div>
          <button class="btn delete-weather-btn btn-danger" data-weather-delete-id=${weather.id}>X</button>
          <div class="form-check form-check-inline">
          <label class="form-check-label" for="inlineCheckbox1">CURRENT ZIP?</label>
            <input class="form-check-input checkIsCurrent" data-zip-id=${zipId} type="checkbox" id="${weather.id}">
          </div>
        </div>
      </div>
      `;
  $('#singleZip').html(cardString);
  if (isCurrent === 'true') {
    $('.checkIsCurrent').attr('checked', true);
  }
  cardString += '<button id="addZip" class="btn btn-info">Add New Zipcode</button>';
};

const getWeatherbitData = (e) => {
  const zipcode = e.target.innerHTML * 1;
  const currentZip = e.target.dataset.dropdownIsCurrent;
  const zipId = e.target.dataset.dropdownZipId;
  weatherData.getWeatherbit(zipcode)
    .then((weather) => {
      printSingleZip(weather, zipId, currentZip);
    })
    .catch((error) => {
      console.error('error getting weather', error);
    });
};

const buildDropdown = (weatherArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  PICK A ZIP
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (weatherArray.length) {
    weatherArray.forEach((weather) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-is-current=${weather.isCurrent} data-dropdown-zip=${weather.zipcode} data-dropdown-zip-id=${weather.id}>${weather.zipcode}</div>`;
    });
  } else {
    dropdown += '<div class="dropdown-item">Add a zipcode</div>';
  }
  dropdown += '<div></div>';
  $('#dropdown-container').html(dropdown);
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  weatherData.getAllZips(uid)
    .then((weatherArray) => {
      buildDropdown(weatherArray);
      zipStringBuilder(weatherArray);
      const currentZip = weatherArray.filter(object => object.isCurrent === true);
      if (currentZip !== undefined) {
        const currentLocation = currentZip[0].zipcode;
        const isCurrent = 'true';
        const zipId = currentZip[0].id;
        weatherData.getWeatherbit(currentLocation)
          .then((weather) => {
            printSingleZip(weather, zipId, isCurrent);
          })
          .catch((error) => {
            console.error('error getting weather data', error);
          });
      } else {
        $('#single-zip').html('Set a current location');
      }
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
      $('#singleZip').html('');
    })
    .catch((error) => {
      console.error('error in deleting zipcode', error);
    });
};

const updateIsCurrent = (e) => {
  const locationId = e.target.dataset.zipId;
  const isCurrent = e.target.checked;
  weatherData.updateIsCurrent(locationId, isCurrent)
    .then(() => {
      weatherPage();
    })
    .catch((err) => {
      console.error('error in updating current zip', err);
    });
};

const bindEvents = () => {
  $('body').on('click', '.delete-weather-btn', deleteZips);
  $('body').on('click', '.checkIsCurrent', updateIsCurrent);
  $('body').on('click', '.get-single', getWeatherbitData);
};

const initializeWeatherPage = () => {
  weatherPage();
  bindEvents();
};

export default initializeWeatherPage;
