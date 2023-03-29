import styles from './Search.module.scss';
import { useEffect, useState } from 'react';

type IProps = {
  callback(value: string): void;
};

export const Search = ({ callback }: IProps) => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('search'));

  const changeSearchValue = (value: string) => {
    callback(value);
    setSearchValue(value);
  };

  useEffect(() => {
    return () => {
      localStorage.setItem('search', searchValue ? searchValue : '');
    };
  }, [searchValue]);

  return (
    <input
      type='text'
      placeholder='search'
      className={styles.input}
      onChange={(e) => {
        changeSearchValue(e.currentTarget.value);
      }}
      value={searchValue ? searchValue : ''}
    ></input>
  );
};
