import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UserInfo } from '../../types/api';
import { getUserProfileData } from '../../api/user';

export const getProfileInfoAction = createAsyncThunk<UserInfo, void, { rejectValue: string }>(
  'user/getProfileInfoAction',
  async (_, thunkAPI) => {
    try {
      const { data } = await getUserProfileData();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Ошибка при получении данных профиля');
    }
  },
);
