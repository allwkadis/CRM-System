import type { LoginUserData, RegisterUserData } from '../types/api';

import { API_ROUTES } from '../utils/constants/routes';
import { baseApiAxios } from './baseApi';

export const authUserRegister = async (userData: RegisterUserData) => {
  try {
    baseApiAxios.post(API_ROUTES.AUTH_REGISTER, userData);
  } catch (err) {
    throw err;
  }
};

export const authUserLogin = async (userData: LoginUserData) => {
  try {
    const response = baseApiAxios.post(API_ROUTES.AUTH_LOGIN, userData);
    return response;
  } catch (err) {
    throw err;
  }
};

export const authUserResetPassword = async (password: string) => {
  try {
    const response = baseApiAxios.put(API_ROUTES.AUTH_RESET_PASSWORD, { password });
    return response;
  } catch (err) {
    throw err;
  }
};

export const authUserLogout = async () => {
  try {
    const response = baseApiAxios.post(API_ROUTES.AUTH_LOGOUT);
    return response;
  } catch (err) {
    throw err;
  }
};
