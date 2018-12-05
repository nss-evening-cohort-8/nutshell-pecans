import $ from 'jquery';
import './addEditEvents.scss';
import authHelpers from '../../helpers/authHelpers';
import eventsData from '../../helpers/data/eventsData';
import initializeEventsPage from '../EventsPage/eventsPage';

const formBuilder = (event) => {
  const form = `
  <div class="form-group">
    <label for="form-event-title">EVENT NAME:</label>
    <input type="text" class="form-control" value="${event.event}" id="form-event-title" placeholder="Party Down Beach">
  </div>
  <div class="form-group">
    <label for="form-event-location">LOCATION:</label>
    <input type="text" class="form-control" value="${event.location}" id="form-event-location" placeholder="Santa Monica">
  </div>
  <div class="form-group">
    <label for="form-event-date">START DATE:</label>
    <input type="text" class="form-control" value="${event.startDate}" id="form-event-date" placeholder="Dec 25th, 8P">
  </div>
  `;

  return form;
};

const gettingEventFromForm = () => {
  const event = {
    event: $('#form-event-title').val(),
    location: $('#form-event-location').val(),
    startDate: $('#form-event-date').val(),
    uid: authHelpers.getCurrentUid(),
  };
  return (event);
};

const buildAddForm = () => {
  const emptyEvent = {
    event: '',
    location: '',
    startDate: '',
  };

  let domString = '<h3>ADD NEW EVENT</h3>';
  domString += formBuilder(emptyEvent);
  domString += '<button id="add-event">Add Event</button>';
  $('#add-edit-event').html(domString).show();
  $('#events').hide();
};

const addNewEvent = () => {
  const newEvent = gettingEventFromForm();
  eventsData
    .addNewEvent(newEvent)
    .then(() => {
      $('#add-edit-event')
        .html('')
        .hide();
      $('#events').show();
      initializeEventsPage();
    })
    .catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '#add-event', addNewEvent);
$('body').on('click', '#buildEventInput', buildAddForm);

export default buildAddForm;
