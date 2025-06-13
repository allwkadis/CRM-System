import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RegisterResponse, RegisterUserData } from '../../../../types/api';
import { authUserRegister } from '../../../../api/auth';

export const SignUp = createAsyncThunk<
  RegisterResponse,
  RegisterUserData,
  {
    rejectValue: string;
  }
>('auth/SignUp', async (userData, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    const response = await authUserRegister(userData);
    if (!response.data) throw new Error('empty Data');
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Произошла ошибка при регистрации');
  }
});
