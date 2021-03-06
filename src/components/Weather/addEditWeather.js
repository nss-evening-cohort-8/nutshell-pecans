import $ from 'jquery';

import weatherData from '../../helpers/data/weatherData';
import initializeWeatherPage from './weatherComponent';
import authHelpers from '../../helpers/authHelpers';

const formBuilder = () => {
  const form = `
  <div class="form-group">
      <input type="text" class="form-control" id="form-zip-added" placeholder="Enter zip code">
    </div>
    `;
  return form;
};

const buildZipForm = () => {
  const emptyZip = {
    zipcode: '',
  };

  let domString = '<h6>Enter Zip Code</h6>';
  domString += formBuilder(emptyZip);
  domString += '<button id="saveZip"> Save your Zip Code</button>';
  $('#editZipForm').html(domString);
};

const gettingZipFromForm = () => {
  const zipCode = {
    zipcode: $('#form-zip-added').val(),
    isCurrent: true,
    uid: authHelpers.getCurrentUid(),
  };
  return zipCode;
};

const addNewZip = () => {
  const newZip = gettingZipFromForm();
  weatherData.addZipcode(newZip)
    .then(() => {
      $('#editZipForm').html('').hide();
      // $('#singleZip').html(newZip);
      initializeWeatherPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#saveZip', addNewZip);

export default buildZipForm;
