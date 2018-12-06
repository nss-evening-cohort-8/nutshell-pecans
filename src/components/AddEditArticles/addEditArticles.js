
import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import articlesData from '../../helpers/data/articlesData';
import initializeArticlesPage from '../ArticlesPage/articlesPage';

const formBuilder = (article) => {
  const form = `
  <div class="form-group">
    <label for="form-friend-name">Title:</label>
    <input type="text" class="form-control" value="${article.title}" id="form-article-title" placeholder="Title">
  </div>
  <div class="form-group">
    <label for="form-friend-address">Synopsis:</label>
    <input type="text" class="form-control" value="${article.synopsis}" id="form-article-synopsis" placeholder="Synopsis">
  </div>
  <div class="form-group">
    <label for="form-friend-email">URL:</label>
    <input type="email" class="form-control" value="${article.url}" id="form-article-url" placeholder="URL">
  </div>
  `;
  return form;
};

const gettingArticleFromForm = () => {
  const article = {
    title: $('#form-article-title').val(),
    synopsis: $('#form-article-synopsis').val(),
    url: $('#form-article-url').val(),
    uid: authHelpers.getCurrentUid(),
  };
  return article;
};

const buildAddArticleForm = () => {
  const emptyArticle = {
    title: '',
    synopsis: '',
    url: '',
  };

  let domString = '<h2>Add New Article</h2>';
  domString += formBuilder(emptyArticle);
  domString += '<button id="add-new-article">Submit</button>';
  $('#add-edit-article').html(domString).show();
  $('#articles').hide();
};

const addArticle = () => {
  const newArticle = gettingArticleFromForm();
  articlesData.addArticle(newArticle)
    .then(() => {
      $('#add-edit-article').html('').hide();
      $('#articles').show();
      initializeArticlesPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

const showEditArticleForm = (e) => {
  const idToEdit = e.target.dataset.editId;
  articlesData.getSingleArticle(idToEdit)
    .then((singleArticle) => {
      let domString = '<h2>Edit Article</h2>';
      domString += formBuilder(singleArticle);
      domString += `<button id="edit-article" data-single-edit-id=${singleArticle.id}>Save Article</button>`;
      $('#add-edit-article').html(domString).show();
      $('#articles').hide();
    })
    .catch((error) => {
      console.error('error in getting single for edit', error);
    });
};

const updateArticle = (e) => {
  const updatedArticle = gettingArticleFromForm();
  const articleId = e.target.dataset.singleEditId;
  articlesData.updateArticle(updatedArticle, articleId)
    .then(() => {
      $('#add-edit-article').html('').hide();
      $('#articles-container').html('');
      $('#articles').show();
      initializeArticlesPage();
    })
    .catch((error) => {
      console.error('error', error);
    });
};

$('body').on('click', '#add-new-article', addArticle);

$('body').on('click', '#edit-article', updateArticle);

export default {
  buildAddArticleForm,
  showEditArticleForm,
};
