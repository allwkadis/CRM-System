import { createSlice } from '@reduxjs/toolkit';
import type { UserInfo } from '../../types/api';
import { getUsersDataAction } from '../actions/getUsersData';

type sortByVariant = 'email' | 'username' | 'id';
type sortOrderVariant = 'asc' | 'desc' | 'none';

interface usersMeta {
  sortBy: string;
  sortOrder: string;
  totalAmount: number;
}

interface AdminSliceInitialValue {
  usersData: UserInfo[] | null;
  usersSortBy: sortByVariant;
  usersSortOrder: sortOrderVariant;
  usersSearchValue: string;
  usersMeta: usersMeta | null;
  isLoading: boolean;
}

const initialState: AdminSliceInitialValue = {
  usersData: null,
  usersMeta: null,
  usersSearchValue: '',
  usersSortBy: 'id',
  usersSortOrder: 'asc',
  isLoading: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    changeSortBy(state, action) {
      state.usersSortBy = action.payload;
    },
    changeSortOrder(state, action) {
      state.usersSortOrder = action.payload;
    },
    changeSearch(state, action) {
      state.usersSearchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersDataAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersDataAction.fulfilled, (state, action) => {
      console.log(1);
      state.usersData = action.payload.data;
      state.usersMeta = action.payload.meta;
      state.isLoading = false;
    });
    builder.addCase(getUsersDataAction.rejected, (state) => {
      state.isLoading = false;
    });
  },
  selectors: {},
});
