import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import store from '../../GlobalStateContext/GlobalStateStore';
import { logout } from '../../GlobalStateContext/AuthSlice';

export const queryClient = new QueryClient();

const apiBaseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
//const apiBaseURL = 'https://express-stuff-trader-site-a0aa93eb2f7d.herokuapp.com/api';
//const apiBaseURL = 'http://localhost:5000/api';

// Create Axios instance with default config
const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    //const token = store.getState().auth.token;
    const token = sessionStorage.getItem('auth_token');

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, 
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      store.dispatch(logout());
      window.location.href = '/'; // Redirect to login
    }
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
