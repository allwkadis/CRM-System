import { createAsyncThunk } from '@reduxjs/toolkit';
import { authUserLogin, authUserLogout, authUserRegister } from '../../api/auth';
import type { LoginResponse, LoginUserData, RegisterResponse, RegisterUserData } from '../../types/api';
import { tokenManager } from '../../utils/TokenManager';

export const Logout = createAsyncThunk('auth/Logout', async (_, thunkApi) => {
  const { rejectWithValue } = thunkApi;
  try {
    await authUserLogout();
    tokenManager.removeTokens();
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Произошла неизвестная ошибка');
  }
});

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
    console.log(response.data.accessToken);
    tokenManager.setAccessToken(response.data.accessToken);
    tokenManager.setRefreshToken(response.data.refreshToken);
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Произошла неизвестная ошибка');
  }
});

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
