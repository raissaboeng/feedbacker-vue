import axios from 'axios';
import AuthService from './auth';
import router from '../router';
import UsersService from './users';

const API_ENVS = {
  production: '',
  development: '',
  local: 'http://localhost:3000'
};

const httpClient = axios.create({
  baseURL: API_ENVS.local
});

httpClient.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use((response) => response, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500;
  if (canThrowAnError) {
    throw new Error(error.message);
  }
  if (error.response.status === 401) {
    router.push({ name: 'Home' });
  }
  return error;
});

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient)
};
