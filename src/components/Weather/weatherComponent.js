import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import getAllZips from '../../helpers/data/weatherData';

const printAllZips = () => {
  const cardString = `
  <div class="card">
  <div class="card-body">
    This is some text within a card body.
  </div>
</div>
  `;
  $('#weather').html(cardString);
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
  printAllZips();
  weatherPage();
};

export default initializeWeatherPage;
