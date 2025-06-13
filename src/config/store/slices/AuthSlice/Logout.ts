import { createAsyncThunk } from '@reduxjs/toolkit';
import { authUserLogout } from '../../../../api/auth';

export const Logout = createAsyncThunk('auth/Logout', async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const response = await authUserLogout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Произошла неизвестная ошибка');
  }
});
