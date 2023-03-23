import API from './api';

const SourcesService = {
 getSourcesMeta: () => {
    return API.get('/sources-meta')
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  
  getSources: (data) => {
    return API.post('/sources', data)
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

};

export default SourcesService;
