import $ from 'jquery';

const printSingleZip = () => {
  const cardString = `
  <div class="card">
  <div class="card-body">
    This is some text within a card body.
  </div>
</div>
  `;
  $('#weather').html(cardString);
};

const initializeWeatherPage = () => {
  printSingleZip();
};

export default initializeWeatherPage;
