import reducer, { setPost, PostsState } from './postsReducer';

const mockPost = {
  title: 'title',
  category: 'work',
  description: 'hello',
  file: undefined,
  color: 'Salmon',
  date: '2023',
  key: Date.now(),
};

const mockPost2 = {
  title: 'title',
  category: 'work',
  description: 'hello',
  file: undefined,
  color: 'Salmon',
  date: '2023',
  key: Date.now(),
};

test('should add new post in store', () => {
  const previousState: PostsState = { posts: null };

  expect(reducer(previousState, setPost(mockPost))).toEqual({
    posts: [mockPost],
  });
});

test('should add the second post in store', () => {
  const previousState: PostsState = { posts: [mockPost] };

  expect(reducer(previousState, setPost(mockPost2))).toEqual({
    posts: [mockPost, mockPost2],
  });
});
