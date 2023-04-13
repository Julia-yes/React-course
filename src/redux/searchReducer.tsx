import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface DataState {
  search: string;
  page: number;
  isFetching: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

const initialState: DataState = {
  search: '',
  page: 1,
  isFetching: false,
  error: undefined,
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setNewSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setNewPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setNewSearch, setNewPage } = dataSlice.actions;

export const selectData = (state: RootState) => state.data.search;

export default dataSlice.reducer;
