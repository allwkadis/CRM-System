import { createSlice } from '@reduxjs/toolkit';
import type { UserInfo } from '../../types/api';
import { tokenManager } from '../../utils/TokenManager';

interface AuthSliceInitialValue {
  isAuth: boolean;
  isLoading: boolean;
  profileData: UserInfo[];
}

const initialState: AuthSliceInitialValue = {
  isAuth: false,
  isLoading: false,
  profileData: [],
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
    },
    login(state) {
      state.isAuth = true;
      
    },
  },
  extraReducers: (builder) => {},
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectIsLoading: (state) => state.isLoading,
    selectProfileData: (state) => state.profileData,
  },
});
