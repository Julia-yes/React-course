import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './searchReducer';
import { dataApi } from './API';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import postsReducer from './postsReducer';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    posts: postsReducer,
    [dataApi.reducerPath]: dataApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
