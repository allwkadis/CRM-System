import type { LoginUserData, RegisterUserData } from '../types/api';

import { API_ROUTES } from '../constants/routes';
import { baseApiAxios } from './baseApi';

export const authUserRegister = async (userData: RegisterUserData) =>
  baseApiAxios.post(API_ROUTES.AUTH_REGISTER, userData);

export const authUserLogin = async (userData: LoginUserData) => baseApiAxios.post(API_ROUTES.AUTH_LOGIN, userData);

export const authUserResetPassword = async (password: string) =>
  baseApiAxios.put(API_ROUTES.AUTH_RESET_PASSWORD, password);

export const authUserLogout = async () => baseApiAxios.post(API_ROUTES.AUTH_LOGOUT);
