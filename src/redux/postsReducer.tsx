import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { IPost } from 'interfaces';

interface PostsState {
  posts: IPost[] | null;
}

const initialState: PostsState = {
  posts: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action: PayloadAction<IPost>) => {
      state.posts = state.posts ? [...state.posts, action.payload] : [action.payload];
    },
  },
});

export const { setPost } = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export default postsSlice.reducer;
