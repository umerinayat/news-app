import API from './api';

const ArticlesService = {
  getArticles: (data) => {
    return API.post('/articles', data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  }
};

export default ArticlesService;
