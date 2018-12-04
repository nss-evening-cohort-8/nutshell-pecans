import $ from 'jquery';
import authHelpers from '../../helpers/authHelpers';
import articlesData from '../../helpers/data/articlesData';

const articlesBuilder = (articlesArray) => {
  articlesArray.forEach((article) => {
    const articleString = `
    <div class="card">
      <div class="card-body">
    <h2>${article.url}</h2>
    <h2>${article.title}</h2>
    <h2>${article.synopsis}</h2>
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
