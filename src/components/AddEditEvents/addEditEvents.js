import $ from 'jquery';
import './addEditEvents.scss';
import authHelpers from '../../helpers/authHelpers';
import eventsData from '../../helpers/data/eventsData';
import initializeEventsPage from '../EventsPage/eventsPage';

const formBuilder = (event) => {
  const form = `
  <div class="form-group">
    <label for="form-event-name">EVENT NAME:</label>
    <input type="text" class="form-control" value="${event.event}" id="form-friend-name" placeholder="John NotSmith">
  </div>
  <div class="form-group">
    <label for="form-friend-address">START DATE</label>
    <input type="text" class="form-control" value="${event.startdate}" id="form-friend-address" placeholder="500 Interstate Blvd">
  </div>
  <div class="form-group">
    <label for="form-friend-email">LOCATION</label>
    <input type="text" class="form-control" value="${event.location}" id="form-friend-email" placeholder="johnNotSmith@gmail.com">
  </div>
  `;

  return form;
};

const gettingEventFromForm = () => {
  const event = {
    event: $('#form-event-name').val(),
    startdate: $('#form-event-startdate').val(),
    location: $('#form-event-location').val(),
    uid: authHelpers.getCurrentUid(),
  };
  return (event);
};

const buildAddForm = () => {
  const emptyEvent = {
    event: '',
    startdate: '',
    location: '',
  };

  let domString = '<h3>ADD NEW EVENT</h3>';
  domString += formBuilder(emptyEvent);
  domString += '<button id="add-event">Add New Event</button>';
  $('#add-edit-event').html(domString).show();
  $('#events').hide();
};

const addNewEvent = () => {
  const newEvent = gettingEventFromForm();
  eventsData.addNewEvent(newEvent)
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

const updateEvent = (e) => {
  const updatedEvent = gettingEventFromForm();
  const eventId = e.target.dataset.singleEditId;
  eventsData.updateEvent(updatedEvent, eventId)
    .then(() => {
      $('#add-edit-event').html('').hide();
      $('#single-event-container').html('');
      $('#events').show();
      initializeEventsPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

// Edit //
const showEditForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  eventsData.getSingleEvent(idToEdit)
    .then((singleEvent) => {
      let domString = '<h3>EDIT FRIEND</h3>';
      domString += formBuilder(singleEvent);
      domString += `<button id="edit-friend" data-single-edit-id=${singleEvent.id}>Save Friend</button>`;
      $('#add-edit-event').html(domString).show();
      $('#events').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

$('body').on('click', '#add-event', addNewEvent);
$('body').on('click', '.edit-btn', showEditForm);
$('body').on('click', '#edit-event', updateEvent);

export default buildAddForm;
