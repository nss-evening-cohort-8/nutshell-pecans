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

const deleteArticle = (e) => {
  // firebase id
  const idToDelete = e.target.dataset.deleteId;
  articlesData.deleteArticle(idToDelete)
    .then(() => {
      articlesPage();
      $('#articles').html('');
    })
    .catch((error) => {
      console.error('error in deleting article', error);
    });
};

const addArticle = () => {
  const newFriend = gettingArticleFromForm();
  articlesData.addNewArticle(newArticle)
    .then(() => {
      $('#add-edit-article').html('').hide();
      $('#articles').show();
      initializeArticlesPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const bindEvents = () => {
  $('body').on('click', '.deleteButton', deleteArticle);
  $('body').on('click', '#add-article', addArticle);
};

const initializeArticlesPage = () => {
  articlesPage();
  bindEvents();
};

export default initializeArticlesPage;
