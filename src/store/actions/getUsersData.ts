import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAdminAllUsers } from '../../api/admin';

export const getUsersDataAction = createAsyncThunk('user/getProfileInfoAction', async (_, thunkAPI) => {
  try {
    const response = await getAdminAllUsers({});
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при получении данных юзеров');
  }
});
