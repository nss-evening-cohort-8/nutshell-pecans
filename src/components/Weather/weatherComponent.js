import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import weatherData from '../../helpers/data/weatherData';

const zipStringBuilder = (weather) => {
  let zipsBuilder = '<h3>Weather</h3>';
  weather.forEach((zipcodes) => {
    zipsBuilder += `<h5>${zipcodes.zipcode}`;
  });
  return zipsBuilder;
};

const printSingleZip = (weather) => {
  console.log(weather);
  let cardString = `
      <div class="card">
        <div class="card-body">
          <div class="zipContainer">${weather.zipcode}</div>
          <button class="btn btn-danger delete-weather-btn" data-weather-delete-id=${weather.id}>X</button>
          <div class="form-check form-check-inline">
          <label class="form-check-label" for="inlineCheckbox1">Current zipcode?</label>
            <input class="form-check-input checkIsCurrent" type="checkbox" id="${weather.id}">
          </div>
        </div>
      </div>
      `;
  $('#singleZip').html(cardString);
  if (weather.isCurrent) {
    $('.checkIsCurrent').attr('checked', true);
  }
  cardString += '<button id="addZip" class="btn btn-info">Add New Zipcode</button>';
  // $('#weather').html(cardString);
};

const getSingleZip = (e) => {
  const zipId = e.target.dataset.dropdownId;
  weatherData.getSingleZip(zipId).then((singleZip) => {
    printSingleZip(singleZip);
  })
    .catch((error) => {
      console.error('error getting single zip', error);
    });
};

const buildDropdown = (weatherArray) => {
  let dropdown = `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Zipcode
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (weatherArray.length) {
    weatherArray.forEach((weather) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-id=${weather.id}>${weather.zipcode}</div>`;
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
  $('body').on('click', '.get-single', getSingleZip);
};

const initializeWeatherPage = () => {
  weatherPage();
  bindEvents();
};

export default initializeWeatherPage;
