import axios from 'axios';
import apiKeys from '../../../db/apiKeys.json';


const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllArticles = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/articles.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const articlesObject = results.data;
      const articlesArray = [];
      if (articlesObject !== null) {
        Object.keys(articlesObject).forEach((articleId) => {
          articlesObject[articleId].id = articleId;
          articlesArray.push(articlesObject[articleId]);
          console.log(articlesArray);
        });
      }
      resolve(articlesArray);
    })
    .catch((error) => {
      reject(error);
    });
});


export default { getAllArticles };
