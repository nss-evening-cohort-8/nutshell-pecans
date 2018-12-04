import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import getAllZips from '../../helpers/data/weatherData';

const printAllZips = (weatherArray) => {
  let cardString = '';
  weatherArray.forEach((weather) => {
    cardString += `
      <div class="card">
      <p></p>
      <div class="card-body">
        <h5>${weather.zipcode}</h5>
      </div>
    </div>
      `;
    $('#weather').html(cardString);
  });
};

const weatherPage = () => {
  const uid = authHelpers.getCurrentUid();
  getAllZips(uid)
    .then((weatherArray) => {
      console.log(weatherArray);
      printAllZips(weatherArray);
    })
    .catch((error) => {
      console.error('error in getting weather', error);
    });
};

const initializeWeatherPage = () => {
  weatherPage();
};

export default initializeWeatherPage;
