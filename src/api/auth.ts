import type { LoginUserData, RegisterUserData } from '../types/api';

import { API_ROUTES } from '../constants/routes';
import { baseApiAxios } from './baseApi';

export const userRegister = async (userData: RegisterUserData) => baseApiAxios.post(API_ROUTES.AUTH_REGISTER, userData);
export const userLogin = async (userData: LoginUserData) => baseApiAxios.post(API_ROUTES.AUTH_LOGIN, userData);
