import React from 'react';
import { Card } from 'components/Card/Card';
import { Search } from 'components/Search/Search';
import styles from './Main.module.scss';
import { Users } from '../../data/data';
import { useCallback, useState } from 'react';

export const Main = () => {
  const [searchValue, setSearchValue] = useState('');

  const changeSearchValue = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Search callback={changeSearchValue} />
      <section>
        <h2 className={styles.title}>Friends</h2>
        <div className={styles.cardArea}>
          {searchValue
            ? Users.filter(
                (user) =>
                  user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                  user.city.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
              ).map((user) => (
                <Card
                  name={user.name}
                  city={user.city}
                  img={user.img}
                  likes={user.likes}
                  views={user.views}
                  key={user.id}
                />
              ))
            : Users.map((user) => (
                <Card
                  name={user.name}
                  city={user.city}
                  img={user.img}
                  likes={user.likes}
                  views={user.views}
                  key={user.id}
                />
              ))}
        </div>
      </section>
    </div>
  );
};
