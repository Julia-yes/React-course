import { DataContext } from 'context/Context';
import styles from './Search.module.scss';
import { useContext, useState } from 'react';

export const Search = () => {
  const { setNewValue } = useContext(DataContext);
  const [search, setSearchValue] = useState(localStorage.getItem('search'));

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter') {
      setNewValue(search ? search : '');
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
            setNewValue(search ? search : '');
            localStorage.setItem('search', search ? search : '');
          }}
        >
          Submit
        </button>
      </form>
    </aside>
  );
};
