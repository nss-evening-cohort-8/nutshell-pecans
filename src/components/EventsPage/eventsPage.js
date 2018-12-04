import $ from 'jquery';
import './eventsPage.scss';
import authHelpers from '../../helpers/authHelpers';
import eventsData from '../../helpers/data/eventsData';

const printAllEvents = (eventsArray) => {
  let domString = '';
  domString += '<h5 class="header text-center">Events</h5>';
  eventsArray.forEach((event) => {
    domString += `<div class="input-group-text task d-flex">
        <h3 class="taskInfo m-1" data-task-id=${event.id}>${event.event}<h3>
        <h3 class="taskInfo m-1" data-task-id=${event.id}>${event.location}<h3>
        <h3 class="taskInfo m-1" data-task-id=${event.id}>${event.startDate}<h3>
         <input class="editButton pt-1 ml-2" data-edit-id=${event.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="25px" height="45px"></input>
         <input class="deleteButton pt-1" data-delete-id=${event.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height="50px"></input>
            </div>`;
    $('#events').html(domString);
  });
};

// const printSingleEvent = (event) => {
//   const eventString = `
//   <div id="singleEvent">
//   <div id="singleBorder">
//     <h1>${event.event}</h1>
//     <h3>${event.startdate}</h3>
//     <p>${event.location}</p>
//     <button class="btn btn-danger delete-btn" data-delete-id=${event.id}>X</button>
//     <button class="btn btn-info edit-btn" data-edit-id=${event.id}>EDIT</button>
//     </div>
//     </div>
//   `;
//   $('#events').html(eventString);
// };


// const getSingleEvent = (e) => {
//   // firebase id
//   const eventId = e.target.dataset.dropdownId;
//   const uid = authHelpers.getCurrentUid();
//   eventsData.getSingleEvent(eventId).then((singleEvent) => {
//     printSingleEvent(singleEvent);
//   })
//     .catch((error) => {
//       console.error('error in getting one event', error);
//     });
// };

const eventsPage = () => {
  const uid = authHelpers.getCurrentUid();
  eventsData.getAllEvents(uid)
    .then((eventsArray) => {
      printAllEvents(eventsArray);
    }).catch((error) => {
      console.error('error in getting tasks', error);
    });
};

// const deleteEvent = (e) => {
//   // firebase id
//   const idToDelete = e.target.dataset.deleteId;
//   axios.delete(`${apiKeys.firebaseKeys.databaseURL}/events/${idToDelete}.json`)
//     .then(() => {
//       eventsPage();
//       $('#single-event-container').html('');
//     })
//     .catch((error) => {
//       console.error('error in deleting event', error);
//     });
// };

// const bindEvents = () => {
//   $('body').on('click', '.dropdown-item', getSingleEvent);
//   $('body').on('click', '.delete-btn', deleteEvent);
//   $('body').on('change', '.is-avoiding-checkbox', updateIsAvoiding);
// };

const initializeEventsPage = () => {
  eventsPage();
  // bindEvents();
};

export default initializeEventsPage;
