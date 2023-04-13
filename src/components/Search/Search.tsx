import styles from './Search.module.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setNewSearch } from 'redux/searchReducer';

export const Search = () => {
  const dispatch = useAppDispatch();
  const searchInit = useAppSelector((state) => state.data.search);
  const [search, setSearchValue] = useState(searchInit);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      changeSearchValue();
    }
  };

  const changeSearchValue = () => {
    dispatch(setNewSearch(search ? search : ''));
  };

  return (
    <aside>
      <form>
        <input
          type='text'
          placeholder='search'
          className={styles.input}
          onChange={(e) => {
            setSearchValue(e.currentTarget.value);
          }}
          onKeyDown={(e) => onKeyDown(e)}
          value={search ? search : ''}
        ></input>
        <button type='button' className={styles.button} onClick={changeSearchValue}>
          Submit
        </button>
      </form>
    </aside>
  );
};
