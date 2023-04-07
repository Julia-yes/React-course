import React, { useContext } from 'react';
import { Card } from 'components/Card/Card';
import { Search } from 'components/Search/Search';
import styles from './Main.module.scss';
import { useCallback, useState } from 'react';
import { Pagination } from 'components/Pagination/Pagination';
import { Loading } from 'components/Loading/Loading';
import { Modal } from 'components/Modal/Modal';
import { DataContext } from 'context/Context';
import { LoadCharacter } from 'context/LoadSource';

export const Main = () => {
  const { loading, data, character, setNewCharacter, setNewLoading } = useContext(DataContext);

  const [modal, setModal] = useState(false);
  const [overLay, setOverLay] = useState(false);

  const showModal = useCallback(
    async (id: number) => {
      setNewLoading(true);
      setModal(true);
      setOverLay(true);
      setNewCharacter(await LoadCharacter(id));
      setNewLoading(false);
    },
    [setNewCharacter, setNewLoading]
  );

  const closeModal = useCallback(() => {
    setModal(false);
    setOverLay(false);
    setNewCharacter(null);
  }, [setNewCharacter]);

  return (
    <div className={styles.wrapper}>
      {loading && <Loading type={'spinningBubbles'} color={'#6bc8be'} />}
      <Search />
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
        {data ? <Pagination /> : null}
      </section>
      {modal && (
        <Modal
          name={character?.name}
          image={character?.image}
          status={character?.status}
          gender={character?.gender}
          type={character?.type}
          species={character?.species}
          callback={closeModal}
        />
      )}
      {overLay && <div className={styles.overlay} onClick={closeModal}></div>}
    </div>
  );
};
