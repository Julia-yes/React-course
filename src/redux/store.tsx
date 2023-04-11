import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchReducer';

export const store = configureStore({
  reducer: {
    searchValue: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
