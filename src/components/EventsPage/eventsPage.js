// // import axios from 'axios';
// // import $ from 'jquery';
// // import './eventsPage.scss';
// // import apiKeys from '../../../db/apiKeys.json';
// import authHelpers from '../../helpers/authHelpers';
// import eventsData from '../../helpers/data/eventsData';

// // // const printSingleEvent = (event) => {
// // //   const eventString = `
// // //   <div id="singleEvent">
// // //   <div id="singleBorder">
// // //     <h1>${event.event}</h1>
// // //     <h3>${event.startdate}</h3>
// // //     <p>${event.location}</p>
// // //     <button class="btn btn-danger delete-btn" data-delete-id=${event.id}>X</button>
// // //     <button class="btn btn-info edit-btn" data-edit-id=${event.id}>EDIT</button>
// // //     </div>
// // //     </div>
// // //   `;
// // //   $('#events').html(eventString);
// // // };


// // // const getSingleEvent = (e) => {
// // //   // firebase id
// // //   const eventId = e.target.dataset.dropdownId;
// // //   const uid = authHelpers.getCurrentUid();
// // //   eventsData.getSingleEvent(eventId).then((singleEvent) => {
// // //     // holidayFriendsData.getHolidayIdsForFriend(friendId).then((holidayIds) => {
// // //     //   console.log('holidayIds', holidayIds);
// // //     //   holidaysData.getHolidaysByArrayOfIds(uid, holidayIds).then((holidays) => {
// // //         printSingleEvent(singleEvent);
// // //       });
// // //     });
// // //   })
// // //     .catch((error) => {
// // //       console.error('error in getting one event', error);
// // //     });
// // // };

// const eventsPage = () => {
//   const uid = authHelpers.getCurrentUid();
//   eventsData.getAllEvents(uid)
//     .then((eventsArray) => {
//       printAllEvents(eventsArray);
//     }).catch((error) => {
//       console.error('error in getting tasks', error);
//     });
// };

// // // const deleteEvent = (e) => {
// // //   // firebase id
// // //   const idToDelete = e.target.dataset.deleteId;
// // //   axios.delete(`${apiKeys.firebaseKeys.databaseURL}/events/${idToDelete}.json`)
// // //     .then(() => {
// // //       eventsPage();
// // //       $('#single-event-container').html('');
// // //     })
// // //     .catch((error) => {
// // //       console.error('error in deleting event', error);
// // //     });
// // // };

// // // const bindEvents = () => {
// // //   $('body').on('click', '.dropdown-item', getSingleEvent);
// // //   $('body').on('click', '.delete-btn', deleteEvent);
// // //   // $('body').on('change', '.is-avoiding-checkbox', updateIsAvoiding);
// // // };

// const initializeEventsPage = () => {
//   eventsPage();
//   bindEvents();
// };

// export default initializeEventsPage;
