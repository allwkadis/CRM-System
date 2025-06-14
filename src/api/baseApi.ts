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

// baseApiAxios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     const refreshToken = tokenManager.getRefreshToken();
//     if (originalRequest.url === API_ROUTES.AUTH_LOGIN || originalRequest.url === API_ROUTES.AUTH_REGISTER) {
//       return Promise.reject(error);
//     }
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       try {
//         const { data } = await baseApiAxios.post(API_ROUTES.AUTH_REFRESH, {
//           refreshToken,
//         });

// <<<<<<< Updated upstream
//         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//         tokenManager.setAccessToken(data.accessToken);
//         tokenManager.setRefreshToken(data.refreshToken);
//         return baseApiAxios(originalRequest);
//       } catch (refreshError) {
//         console.log(1);
//         tokenManager.removeTokens();
//         // window.location.href = '/auth/login';
//       }
//     }
// =======
//     console.log(error);
// >>>>>>> Stashed changes

// //     return Promise.reject(error);
//   },
// );
