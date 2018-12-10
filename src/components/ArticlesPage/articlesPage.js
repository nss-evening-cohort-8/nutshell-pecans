import $ from 'jquery';
import 'bootstrap';
import './articlesPage.scss';
// import authHelpers from '../../helpers/authHelpers';
import articlesData from '../../helpers/data/articlesData';

const articlesBuilder = (articlesArray) => {
  let articleString = '';
  articleString += '<h1 class="articles-header text-center">ARTICLES</h1>';
  articlesArray.forEach((article) => {
    articleString += `
    <div class="card articleInfo d-flex">
      <div class="card-body-article text-center">
        <h2 class="card-title"><b>${article.title}</h2>
        <h4>${article.synopsis}</h4>
        <h5><a href="https://${article.url}" target="_blank">View Article</a></h5>
        <input class="editArticlesButton float-left pt-1 ml-2" data-edit-id=${article.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="25px" height="45px"></input>
         <input class="deleteArticlesButton float-right pt-1" data-delete-id=${article.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height="50px"></input>
    </div>
    </div>
  `;
  });
  $('#articles').html(articleString);
};

const articlesPage = () => {
  // const uid = authHelpers.getCurrentUid();
  articlesData.getAllArticles()
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
