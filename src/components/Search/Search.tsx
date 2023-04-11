import styles from './Search.module.scss';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { setNewValue } from 'redux/searchReducer';

export const Search = () => {
  const dispatch = useAppDispatch();
  const [search, setSearchValue] = useState(localStorage.getItem('search'));

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter') {
      dispatch(setNewValue(search ? search : ''));
      localStorage.setItem('search', search ? search : '');
    }
  };

  return (
    <aside>
      <form onKeyDown={(e) => onKeyDown(e)}>
        <input
          type='text'
          placeholder='search'
          className={styles.input}
          onChange={(e) => {
            setSearchValue(e.currentTarget.value);
          }}
          value={search ? search : ''}
        ></input>
        <button
          type='button'
          className={styles.button}
          onClick={(e) => {
            dispatch(setNewValue(search ? search : ''));
          }}
        >
          Submit
        </button>
      </form>
    </aside>
  );
};
