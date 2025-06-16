import { baseApiAxios } from './baseApi';

export const getAdminAllUsers = async (params) => {
  try {
    const response = await baseApiAxios.get('/admin/users', {
      params: {
        search: params.search,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};
