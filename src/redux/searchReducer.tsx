import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { IData } from 'interfaces';

type IProps = {
  search: string;
  page: number;
};

export const fetchData = createAsyncThunk('data/fetchAllData', async (props: IProps, thunkAPI) => {
  const { search, page } = props;
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${search}&page=${page}`
  );
  return response.json();
});

export interface DataState {
  search: string;
  page: number;
  loading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  data: IData | null;
}

const initialState: DataState = {
  search: '',
  page: 1,
  loading: false,
  error: undefined,
  data: null,
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
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
  },
});

export const { setNewSearch, setNewPage } = dataSlice.actions;

export const selectData = (state: RootState) => state.data.search;

export default dataSlice.reducer;
