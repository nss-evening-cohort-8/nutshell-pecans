import authHelpers from '../../helpers/authHelpers';
import articlesData from '../../helpers/data/articlesData';

const articlesPage = () => {
  const uid = authHelpers.getCurrentUid();
  articlesData.getAllArticles(uid)
    .then((articlesArray) => {
      console.log(articlesArray);
    })
    .catch((error) => {
      console.error('error in getting articles', error);
    });
};

const initializeArticlesPage = () => {
  articlesPage();
};

export default initializeArticlesPage;
