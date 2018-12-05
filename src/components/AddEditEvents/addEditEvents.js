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
