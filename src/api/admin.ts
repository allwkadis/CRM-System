import { baseApiAxios } from './baseApi';

export const getAdminAllUsers = async (params) => {
  try {
    const response = await baseApiAxios.get('/admin/users', {
      params: {
        search: params.search,
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};
