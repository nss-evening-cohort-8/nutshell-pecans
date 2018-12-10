import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';


const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllArticles = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/articles.json`)
    .then((results) => {
      const articlesObject = results.data;
      const articlesArray = [];
      if (articlesObject !== null) {
        Object.keys(articlesObject).forEach((articleId) => {
          articlesObject[articleId].id = articleId;
          articlesArray.push(articlesObject[articleId]);
        });
      }
      resolve(articlesArray);
    })
    .catch((error) => {
      reject(error);
    });
});

const getSingleArticle = articleId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/articles/${articleId}.json`)
    .then((result) => {
      const singleArticle = result.data;
      singleArticle.id = articleId;
      resolve(singleArticle);
    })
    .catch((error) => {
      reject(error);
    });
});

const deleteArticle = articleId => axios.delete(`${firebaseUrl}/articles/${articleId}.json`);

const addArticle = articlesObject => axios.post(`${firebaseUrl}/articles.json`, JSON.stringify(articlesObject));

const updateArticle = (articlesObject, articleId) => axios.put(`${firebaseUrl}/articles/${articleId}.json`, JSON.stringify(articlesObject));

export default {
  getAllArticles,
  getSingleArticle,
  deleteArticle,
  addArticle,
  updateArticle,
};
