import axios from 'axios';

import { API_ROUTES } from '../utils/constants/routes';
import { tokenManager } from '../utils/TokenManager';

export const baseApiAxios = axios.create({
  baseURL: API_ROUTES.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

baseApiAxios.interceptors.request.use(
  (config) => {
    const accesToken = tokenManager.getAccessToken();
    console.log(accesToken);
    if (accesToken) {
      config.headers.Authorization = `Bearer ${accesToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
