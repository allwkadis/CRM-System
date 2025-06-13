import axios from 'axios';

import { API_ROUTES } from '../utils/constants/routes';
import { useDispatch } from 'react-redux';

export const baseApiAxios = axios.create({
  baseURL: API_ROUTES.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

baseApiAxios.interceptors.request.use(
  (config) => {
    const accesToken = localStorage.getItem('accessToken');

    if (accesToken) {
      config.headers.Authorization = `Bearer ${accesToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

baseApiAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const dispatch = useDispatch() 
    

    if (originalRequest.url === API_ROUTES.AUTH_LOGIN || originalRequest.url === API_ROUTES.AUTH_REGISTER) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const { data } = await baseApiAxios.post(API_ROUTES.AUTH_REFRESH, {
          refreshToken,
        });

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return baseApiAxios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // dispatch()
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  },
);
