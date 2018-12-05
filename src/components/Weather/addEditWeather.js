// import $ from 'jquery';

const buildAddForm = () => {
  console.log('form');
  const form = `
  <div class="form-group">
      <input type="text" class="form-control" id="form-zip-added" placeholder="Enter zip code">
    </div>
    `;
  return form;
};

// const gettingZipFromForm = () => {
//   const zipCode = {
//     zipcode: $('#form-zip-added').val(),
//     isCurrent: true,
//   };
//   return zipCode;
// };

export default buildAddForm;
