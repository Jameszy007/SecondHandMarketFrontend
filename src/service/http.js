import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:5173/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// request interceptors, doing stuff before actual sending request
http.interceptors.request.use(
  (config) => {
    //if token exists add it into header
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptors, doing stuff after receiving response
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default http;
