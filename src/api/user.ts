import type { UpdateProfileUserData } from '../types/api';
import { API_ROUTES } from '../utils/constants/routes';
import { baseApiAxios } from './baseApi';

export const getUserProfileData = async () => baseApiAxios.get(API_ROUTES.USER_PROFILE);

export const updateProfile = async (userData: UpdateProfileUserData) =>
  baseApiAxios.put(API_ROUTES.USER_PROFILE, userData);
