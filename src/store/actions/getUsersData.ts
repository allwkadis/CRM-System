import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAdminAllUsers } from '../../api/admin';

export const getUsersDataAction = createAsyncThunk('user/getProfileInfoAction', async (params, thunkAPI) => {
  try {
    const response = await getAdminAllUsers(params);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при получении данных юзеров');
  }
});
