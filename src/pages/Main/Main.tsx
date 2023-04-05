import React, { useEffect } from 'react';
import { Card } from 'components/Card/Card';
import { Search } from 'components/Search/Search';
import styles from './Main.module.scss';
import { useCallback, useState } from 'react';
import { ICharacter, IData } from 'interfaces';
import { Pagination } from 'components/Pagination/Pagination';
import { Loading } from 'components/Loading/Loading';
import { Modal } from 'components/Modal/Modal';

export const Main = () => {
  const [searchValue, setSearchValue] = useState(localStorage.getItem('search'));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData | null>(null);
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [modal, setModal] = useState(false);
  const [overLay, setOverLay] = useState(false);

  const filterData = (search: string, page?: number) => {
    setLoading(true);
    const apiUrl = page
      ? `https://rickandmortyapi.com/api/character/?name=${search}&page=${page}`
      : `https://rickandmortyapi.com/api/character/?name=${search}`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((repos) => {
        setData(repos);
        setLoading(false);
      })
      .catch((error) => {
        setData(null);
        setLoading(false);
      });
  };

  const changeSearchValue = useCallback((value: string) => {
    setSearchValue(value);
    localStorage.setItem('search', value);
  }, []);

  const loadSource = (page?: number) => {
    setLoading(true);
    const apiUrl = page
      ? `https://rickandmortyapi.com/api/character?page=${page}`
      : `https://rickandmortyapi.com/api/character`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setData(repos);
        setLoading(false);
      });
  };

  const loadCharacter = (id: number) => {
    setLoading(true);
    const apiUrl = `https://rickandmortyapi.com/api/character/${id}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setCharacter(repos);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchValue ? filterData(searchValue) : loadSource();
  }, [setData, searchValue]);

  const changePage = useCallback(
    (page: number) => {
      setPage(page);
      searchValue ? filterData(searchValue, page) : loadSource(page);
    },
    [searchValue]
  );

  const showModal = useCallback((id: number) => {
    setModal(true);
    loadCharacter(id);
    setOverLay(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
    setOverLay(false);
    setCharacter(null);
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading && <Loading type={'spinningBubbles'} color={'#6bc8be'} />}
      <Search callback={changeSearchValue} />
      <section>
        <h2 className={styles.title}>Characters</h2>
        <div className={styles.cardArea}>
          {data ? (
            data.results.map((user) => (
              <Card
                name={user.name}
                status={user.status}
                img={user.image}
                id={user.id}
                key={user.id}
                callback={showModal}
              />
            ))
          ) : (
            <div className={styles.error}>No information. Change string for searching</div>
          )}
        </div>
        {data ? (
          <Pagination
            callback={changePage}
            activePage={page}
            coutOfPages={data?.info.pages ? data?.info.pages : 0}
          />
        ) : null}
      </section>
      {modal && (
        <Modal
          name={character?.name}
          image={character?.image}
          status={character?.status}
          gender={character?.gender}
          type={character?.type}
          created={character?.created}
          species={character?.species}
          callback={closeModal}
        />
      )}
      {overLay && <div className={styles.overlay} onClick={closeModal}></div>}
    </div>
  );
};
