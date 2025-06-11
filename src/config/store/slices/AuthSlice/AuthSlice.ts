import { createSlice } from '@reduxjs/toolkit';
import { SignIn } from './SignIn';

interface AuthSliceInitialValue {
  isAuth: boolean;
  isLoading: boolean;
}

const initialState: AuthSliceInitialValue = {
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignIn.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(SignIn.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = true;
      }),
      builder.addCase(SignIn.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectIsAuth: (state) => state.isAuth,
  },
});
