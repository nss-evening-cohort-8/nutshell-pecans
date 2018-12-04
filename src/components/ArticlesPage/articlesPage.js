import $ from 'jquery';
import 'bootstrap';
import authHelpers from '../../helpers/authHelpers';
import articlesData from '../../helpers/data/articlesData';

const articlesBuilder = (articlesArray) => {
  articlesArray.forEach((article) => {
    const articleString = `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">${article.title}</h2>
        <h2>${article.url}</h2>
        <h2>${article.synopsis}</h2>
        <input class="editButton pt-1 ml-2" data-edit-id=${article.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="25px" height="45px"></input>
         <input class="deleteButton pt-1" data-delete-id=${article.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height="50px"></input>
    </div>
    </div>
  `;
    $('#articles').append(articleString);
  });
};


const articlesPage = () => {
  const uid = authHelpers.getCurrentUid();
  articlesData.getAllArticles(uid)
    .then((articlesArray) => {
      articlesBuilder(articlesArray);
    })
    .catch((error) => {
      console.error('error in getting articles', error);
    });
};

const initializeArticlesPage = () => {
  articlesPage();
};

export default initializeArticlesPage;
