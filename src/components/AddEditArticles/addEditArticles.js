
import $ from 'jquery';
// import authHelpers from '../../helpers/authHelpers';
// import articlesData from '../../helpers/data/articlesData';
// import initializeArticlesPage from '../ArticlesPage/articlesPage';

const formBuilder = (article) => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Title:</label>
    <input type="text" class="form-control" value="${article.title}" id="form-article-title" placeholder="Title">
  </div>
  <div class="form-group">
    <label for="form-friend-address">Synopsis:</label>
    <input type="text" class="form-control" value="${article.synopsis}" id="form-article-synopsis" placeholder="500 Interstate Blvd S">
  </div>
  <div class="form-group">
    <label for="form-friend-email">URL:</label>
    <input type="email" class="form-control" value="${article.url}" id="form-article-url" placeholder="fake@person.com">
  </div>
  `;
  return form;
};

// const gettingArticleFromForm = () => {
//   const article = {
//     title: $('#form-friend-title').val(),
//     synopsis: $('#form-friend-synopsis').val(),
//     url: $('#form-friend-url').val(),
//     uid: authHelpers.getCurrentUid(),
//   };
//   return article;
// };

const buildAddForm = () => {
  const emptyArticle = {
    title: '',
    synopsis: '',
    url: '',
  };

  let domString = '<h2>Add New Article/h2>';
  domString += formBuilder(emptyArticle);
  $('#add-edit-article').html(domString).show();
  $('#articles').hide();
};

// const addArticle = () => {
//   const newArticle = gettingArticleFromForm();
//   articlesData.addNewArticle(newArticle)
//     .then(() => {
//       $('#add-edit-article').html('').hide();
//       $('#articles').show();
//       initializeArticlesPage();
//     })
//     .catch((error) => {
//       console.error('error', error);
//     });
// };

bindArticles= () => {
  $('#add-edit-article').on('click', buildAddForm);
};

export default bindArticles;
