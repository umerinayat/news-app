import API from './api';

const AuthService = {
  login: (data) => {
    return API.post('/login', data)
      .then(({ data }) => {
        setHeadersAndStorage(data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
  
  register: (data) => {
    return API.post('/register', data)
      .then(({ data }) => {
        setHeadersAndStorage(data);
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  logout: () => {
    return API.post('/logout', {})
      .then(({ data }) => {
        resetHeadersAndStorage();
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },

  updateProfile: (data) => {
    const headers = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    };
    return API.post('/users/update', data, headers)
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
};

const setHeadersAndStorage = ({ user, token }) => {
  API.defaults.headers['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
};

const resetHeadersAndStorage = () => {
    API.defaults.headers['Authorization'] = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

export default AuthService;
