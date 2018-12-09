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

const printSingleZip = (weather, zipId, isCurrent) => {
  let cardString = `
      <div class="card">
        <div class="card-body">
          <div class="zipContainer">
            <h5>${weather.city_name}, ${weather.state_code}</h5>
            <img src="https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png"></img>
            <p>${weather.temp}</p>
            <p>${weather.weather.description}</p>
          </div>
          <button class="btn btn-danger delete-weather-btn" data-weather-delete-id=${weather.id}>X</button>
          <div class="form-check form-check-inline">
          <label class="form-check-label" for="inlineCheckbox1">Current zipcode?</label>
            <input class="form-check-input checkIsCurrent" data-zip-id=${zipId} type="checkbox" id="${weather.id}">
          </div>
        </div>
      </div>
      `;
  // const currentLocation = isCurrent;
  $('#singleZip').html(cardString);
  if (isCurrent === 'true') {
    $('.checkIsCurrent').attr('checked', true);
  }
  cardString += '<button id="addZip" class="btn btn-info">Add New Zipcode</button>';
  // $('#weather').html(cardString);
};

// const getSingleZip = (e) => {
//   const zipId = e.target.dataset.dropdownId;
//   weatherData.getSingleZip(zipId).then((singleZip) => {
//     printSingleZip(singleZip);
//   })
//     .catch((error) => {
//       console.error('error getting single zip', error);
//     });
// };

const getWeatherbitData = (e) => {
  const zipcode = e.target.dataset.dropdownZip;
  const currentZip = e.target.dataset.isCurrent;
  const zipId = e.target.id;
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
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Pick a Zipcode
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">`;
  if (weatherArray.length) {
    weatherArray.forEach((weather) => {
      dropdown += `<div class="dropdown-item get-single" data-dropdown-zip=${weather.zipcode}>${weather.zipcode}</div>`;
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
  $('body').on('click', '.get-single', getWeatherbitData);
};

const initializeWeatherPage = () => {
  weatherPage();
  bindEvents();
};

export default initializeWeatherPage;
