import { API_ROUTES } from '../constants/routes';
import { baseApiAxios } from './baseApi';

// export const authUserResetPassword = async (password: string) =>
//   baseApiAxios.put(API_ROUTES.AUTH_RESET_PASSWORD, password);

export const getUserProfileData = async () => baseApiAxios.get(API_ROUTES.USER_PROFILE, {});
