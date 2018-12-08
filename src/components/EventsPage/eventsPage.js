import $ from 'jquery';
import './eventsPage.scss';
import authHelpers from '../../helpers/authHelpers';
import eventsData from '../../helpers/data/eventsData';

const printAllEvents = (eventsArray) => {
  let domString = '';
  domString += '<h1 class="events-header text-center">EVENTS</h1>';
  eventsArray.forEach((event) => {
    domString += `<div class="eventInfo event d-flex">
        <h3 class="taskInfo m-1" data-task-id=${event.id}>WHAT:  ${event.event}<h3>
        <h3 class="taskInfo m-1" data-task-id=${event.id}>WHERE: ${event.location}<h3>
        <h3 class="taskInfo m-1" data-task-id=${event.id}>WHEN: ${event.startDate}<h3>
        <div class="form-check form-check-inline">
        <label class="form-check-label" for="inlineCheckbox1">Attending?</label>
        <input class="form-check-input is-attending-checkbox" type="checkbox" id="${event.id}"></input>
      </div>
         <input class="event-edit-button pt-1 ml-2" data-edit-id=${event.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="25px" height="45px"></input>
         <input class="deleteButton pt-1" data-delete-id=${event.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height="50px"></input>
            </div>`;
    $('#events').html(domString);
    if (friend.isAvoiding) {
      $('.is-avoiding-checkbox').attr('checked', true);
    }
  });

  const eventsPage = () => {
    const uid = authHelpers.getCurrentUid();
    eventsData.getAllEvents(uid)
      .then((eventsArray) => {
        printAllEvents(eventsArray);
      }).catch((error) => {
        console.error('error in getting tasks', error);
      });
  };

  const updateIsAvoiding = (e) => {
    const eventId = e.target.id;
    const isAvoiding = e.target.checked;
    eventsData.updatedIsAvoiding(eventId, isAvoiding)
      .then(() => {

      })
      .catch((err) => {
        console.error('error in updating flag', err);
      });
    console.log('you clicked checkbox');
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
    $('body').on('change', '.is-attending-checkbox', updateIsAvoiding);
  };

  const initializeEventsPage = () => {
    eventsPage();
    bindEvents();
  };

  export default initializeEventsPage;

