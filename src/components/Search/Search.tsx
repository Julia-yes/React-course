import styles from './Search.module.scss';
import { useState } from 'react';

type IProps = {
  callback(value: string): void;
};

export const Search = ({ callback }: IProps) => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('search'));

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter') {
      callback(searchValue ? searchValue : '');
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
          value={searchValue ? searchValue : ''}
        ></input>
        <button
          type='button'
          className={styles.button}
          onClick={(e) => callback(searchValue ? searchValue : '')}
        >
          Submit
        </button>
      </form>
    </aside>
  );
};
