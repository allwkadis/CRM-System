import { createSlice } from '@reduxjs/toolkit';
import type { UserInfo } from '../../types/api';
import { getProfileInfoAction } from '../actions/getProfileData';

interface AuthSliceInitialValue {
  isAuth: boolean;
  isLoading: boolean;
  profileData: UserInfo | null;
}

const initialState: AuthSliceInitialValue = {
  isAuth: false,
  isLoading: false,
  profileData: null,
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
  extraReducers: (builder) => {
    builder.addCase(getProfileInfoAction.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(getProfileInfoAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileData = action.payload;
      });
    builder.addCase(getProfileInfoAction.rejected, (state) => {
      state.isLoading = false;
      state.profileData = null;
    });
  },
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectIsLoading: (state) => state.isLoading,
    selectProfileData: (state) => state.profileData,
  },
});
