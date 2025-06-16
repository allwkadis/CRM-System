import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from './slices/userSlice';
import { adminSlice } from './slices/adminSlice';

const RootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [adminSlice.name]: adminSlice.reducer,
});

export const store = configureStore({
  reducer: RootReducer,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
