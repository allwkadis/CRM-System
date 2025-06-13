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

    if (originalRequest.url === API_ROUTES.AUTH_LOGIN || API_ROUTES.AUTH_REGISTER) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = tokenManager.getRefreshToken();

      try {
        const { data } = await baseApiAxios.post(API_ROUTES.AUTH_REFRESH, {
          refreshToken,
        });
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        tokenManager.setAccessToken(data.accessToken);
        tokenManager.setRefreshToken(data.refreshToken);
        return baseApiAxios(originalRequest);
      } catch (refreshError) {
        tokenManager.removeTokens();
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  },
);
