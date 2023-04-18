import reducer, { setNewSearch, setNewPage, DataState } from './searchReducer';

test('should add new search value in store', () => {
  const previousState: DataState = {
    search: '',
    page: 1,
    loading: false,
    error: undefined,
    data: null,
  };

  expect(reducer(previousState, setNewSearch('test'))).toEqual({
    error: undefined,
    loading: false,
    page: 1,
    search: 'test',
    data: null,
  });
});

test('should add new page value in store', () => {
  const previousState: DataState = {
    search: '',
    page: 1,
    loading: false,
    error: undefined,
    data: null,
  };

  expect(reducer(previousState, setNewPage(5))).toEqual({
    error: undefined,
    loading: false,
    page: 5,
    search: '',
    data: null,
  });
});
