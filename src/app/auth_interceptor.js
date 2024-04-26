import axios from 'axios';
import authStore from './zustand_auth_store';

const getAccessToken = authStore.getState().getAccessToken
const isJwtLoggedIn = authStore.getState().isJwtLoggedIn
const authAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

authAxios.interceptors.request.use(
  config => {
    if(!isJwtLoggedIn()) {
        throw 'Not logged In';
    }
    config.headers['Authorization'] = getAccessToken();

    return config
  },
  error => {
    return Promise.reject(error);
  }
);

export default authAxios