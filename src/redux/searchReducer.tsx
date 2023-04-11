import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface SearchState {
  value: string;
}

const initialState: SearchState = {
  value: '',
};

export const searchSlice = createSlice({
  name: 'searchValue',
  initialState,
  reducers: {
    setNewValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setNewValue } = searchSlice.actions;

export const selectCount = (state: RootState) => state.searchValue.value;

export default searchSlice.reducer;
