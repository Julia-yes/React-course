import { Card } from 'components/Card/Card';
import { Search } from 'components/Search/Search';
import styles from './Main.module.scss';
import { useCallback, useState } from 'react';
import { Pagination } from 'components/Pagination/Pagination';
import { Loading } from 'components/Loading/Loading';
import { Modal } from 'components/Modal/Modal';
import { useAppSelector } from 'redux/hooks';
import { useGetDataQuery } from 'redux/API';

export const Main = () => {
  const search = useAppSelector((state) => state.data.search);
  const page = useAppSelector((state) => state.data.page);
  const { data, error, isFetching } = useGetDataQuery({ search: search, page: page });

  const [id, setId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [overLay, setOverLay] = useState(false);

  const showModal = useCallback((id: number) => {
    setId(id);
    setModal(true);
    setOverLay(true);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
    setOverLay(false);
  }, []);

  return (
    <div className={styles.wrapper}>
      {isFetching && <Loading type={'spinningBubbles'} color={'#6bc8be'} />}
      <Search />
      <section>
        <h2 className={styles.title}>Characters</h2>
        <div className={styles.cardArea}>
          {!error &&
            data &&
            data.results.map((user) => (
              <Card
                name={user.name}
                status={user.status}
                img={user.image}
                id={user.id}
                key={user.id}
                callback={showModal}
              />
            ))}
          {error && <div className={styles.error}>No information. Change string for searching</div>}
        </div>
        {data ? <Pagination pages={data.info.pages} /> : null}
      </section>
      {modal && <Modal id={id} callback={closeModal} />}
      {overLay && <div className={styles.overlay} onClick={closeModal}></div>}
    </div>
  );
};
