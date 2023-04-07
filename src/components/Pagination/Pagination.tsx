import { useContext } from 'react';
import styles from './Pagination.module.scss';
import { DataContext } from 'context/Context';
import { LoadSource } from 'context/LoadSource';

export const Pagination = () => {
  const { data, activePage, setNewActivePage, setNewLoading, setNewData, searchValue } =
    useContext(DataContext);

  const countOfPages = data?.info.pages ? data?.info.pages : 0;

  const changePage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newValue = e.currentTarget.innerHTML === 'Prev' ? activePage - 1 : activePage + 1;
    setNewActivePage(newValue);
    setNewLoading(true);
    setNewData(await LoadSource(searchValue, newValue));
    setNewLoading(false);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={activePage === 1 ? `${styles.button} ${styles.buttonDisable}` : styles.button}
        onClick={async (e) => {
          changePage(e);
        }}
        disabled={activePage === 1 ? true : false}
      >
        Prev
      </button>
      <div className={styles.info} data-testid='sectionTest'>
        Page {activePage} of {countOfPages}
      </div>
      <button
        className={
          activePage === countOfPages ? `${styles.button} ${styles.buttonDisable}` : styles.button
        }
        disabled={activePage === countOfPages ? true : false}
        onClick={async (e) => {
          changePage(e);
        }}
      >
        Next
      </button>
    </div>
  );
};
