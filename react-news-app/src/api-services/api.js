import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_NEWS_AGREGATOR_API_URL,
    headers: {
        'Accept': 'application/json',
        // "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token') || null}`
    }
});

API.interceptors.response.use(
    res => {
        return res;
    },
    err => {

        if(err.response.status === 401)
        {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

        } 

        throw err;
    }
)

export default API