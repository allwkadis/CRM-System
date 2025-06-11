import { createAsyncThunk } from '@reduxjs/toolkit';
import { authUserLogin } from '../../../../api/auth';
import type { LoginResponse, LoginUserData } from '../../../../types/api';

export const SignIn = createAsyncThunk<
  LoginResponse,
  LoginUserData,
  {
    rejectValue: string;
  }
>('auth/SignIn', async (userData, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const response = await authUserLogin(userData);
    if (!response.data) throw new Error('empty Data');
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Произошла неизвестная ошибка');
  }
});
