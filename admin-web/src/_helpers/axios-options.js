import axios from 'axios';

export const A = 1;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
