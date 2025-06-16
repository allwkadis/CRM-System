import type { UpdateProfileUserData, UserInfo } from '../types/api';
import { API_ROUTES } from '../utils/constants/routes';
import { baseApiAxios } from './baseApi';

export const getUserProfileData = async () => {
  try {
    const response = baseApiAxios.get<UserInfo>(API_ROUTES.USER_PROFILE);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateProfile = async (userData: UpdateProfileUserData) => {
  try {
    const response = baseApiAxios.put<UserInfo>(API_ROUTES.USER_PROFILE, userData);
    return response;
  } catch (err) {
    throw err;
  }
};
