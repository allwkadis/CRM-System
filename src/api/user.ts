import { API_ROUTES } from '../constants/routes';
import { baseApiAxios } from './baseApi';

export const getUserProfileData = async () => baseApiAxios.get(API_ROUTES.USER_PROFILE);
