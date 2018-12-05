import $ from 'jquery';
import './eventsPage.scss';
import authHelpers from '../../helpers/authHelpers';
import eventsData from '../../helpers/data/eventsData';

const printAllEvents = (eventsArray) => {
  let domString = '';
  domString += '<h3 class="events-header text-center">Events</h3>';
  eventsArray.forEach((event) => {
    domString += `<div class="eventInfo event d-flex">
        <h3 class="taskInfo m-1" data-task-id=${event.id}>What: ${event.event}<h3>
        <h5 class="taskInfo m-1" data-task-id=${event.id}>Where: ${event.location}<h3>
        <h6 class="taskInfo m-1" data-task-id=${event.id}>When: ${event.startDate}<h3>
         <input class="event-edit-button pt-1 ml-2" data-edit-id=${event.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="25px" height="45px"></input>
         <input class="deleteButton pt-1" data-delete-id=${event.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height="50px"></input>
            </div>`;
    $('#events').html(domString);
  });
};

const eventsPage = () => {
  const uid = authHelpers.getCurrentUid();
  eventsData.getAllEvents(uid)
    .then((eventsArray) => {
      printAllEvents(eventsArray);
    }).catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const deleteEvent = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  eventsData.deleteEvent(idToDelete)
    .then(() => {
      eventsPage();
      $('#single-event-container').html('');
    })
    .catch((error) => {
      console.error('error in deleting event', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.deleteButton', deleteEvent);
};

const initializeEventsPage = () => {
  eventsPage();
  bindEvents();
};

export default initializeEventsPage;
