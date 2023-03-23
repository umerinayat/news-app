import API from './api';

const NewsService = {
  getNews: (data) => {
    return API.post('/news', data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  getNewsSettings: (data) => {
    return API.get('/news-settings')
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  saveNewsSettings: (data) => {
    return API.post('/news-settings', data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default NewsService;
