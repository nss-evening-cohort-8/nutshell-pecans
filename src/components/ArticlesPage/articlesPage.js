import $ from 'jquery';
import 'bootstrap';
import './articlesPage.scss';
import authHelpers from '../../helpers/authHelpers';
import articlesData from '../../helpers/data/articlesData';

const articlesBuilder = (articlesArray) => {
  let articleString = '';
  articlesArray.forEach((article) => {
    articleString += `
    <div class="card articleInfo d-flex">
      <div class="card-body text-center">
        <h2 class="card-title"><b>${article.title}</h2>
        <h4>${article.synopsis}</h4>
        <h5><a href="${article.url}">View Article</a></h5>
        <input class="editArticlesButton pt-1 ml-2" data-edit-id=${article.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="25px" height="45px"></input>
         <input class="deleteArticlesButton pt-1" data-delete-id=${article.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height="50px"></input>
    </div>
    </div>
  `;
  });
  $('#articles-container').html(articleString);
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

const deleteArticle = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  articlesData.deleteArticle(idToDelete)
    .then(() => {
      articlesPage();
    })
    .catch((error) => {
      console.error('error in deleting article', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.deleteArticlesButton', deleteArticle);
};

const initializeArticlesPage = () => {
  articlesPage();
  bindEvents();
};

export default initializeArticlesPage;
