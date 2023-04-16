import reducer, { setNewSearch, setNewPage, DataState } from './searchReducer';

test('should add new search value in store', () => {
  const previousState: DataState = { search: '', page: 1, isFetching: false, error: undefined };

  expect(reducer(previousState, setNewSearch('test'))).toEqual({
    error: undefined,
    isFetching: false,
    page: 1,
    search: 'test',
  });
});

test('should add new page value in store', () => {
  const previousState: DataState = { search: '', page: 1, isFetching: false, error: undefined };

  expect(reducer(previousState, setNewPage(5))).toEqual({
    error: undefined,
    isFetching: false,
    page: 5,
    search: '',
  });
});
