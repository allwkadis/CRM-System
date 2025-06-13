import { createSlice } from '@reduxjs/toolkit';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Logout } from './Logout';

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
    builder.addCase(SignUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SignUp.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(SignUp.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(Logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(Logout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuth = false;
    });
  },
  selectors: {
    selectIsAuth: (state) => state.isAuth,
    selectIsLoading: (state) => state.isLoading,
  },
});
