import { useContext } from 'react';
import styles from './Pagination.module.scss';
import { DataContext } from 'context/Context';
import { LoadSource } from 'context/LoadSource';

type IProps = {
  pages: number | null;
};

export const Pagination = ({ pages }: IProps) => {
  const { activePage, setNewActivePage, setNewLoading, setNewData, searchValue } =
    useContext(DataContext);

  const changePage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newValue = e.currentTarget.innerHTML === 'Prev' ? activePage - 1 : activePage + 1;
    setNewActivePage(newValue);
    setNewLoading();
    setNewData(await LoadSource(searchValue, newValue));
    setNewLoading();
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
        Page {activePage} of {pages}
      </div>
      <button
        className={
          activePage === pages ? `${styles.button} ${styles.buttonDisable}` : styles.button
        }
        disabled={activePage === pages ? true : false}
        onClick={async (e) => {
          changePage(e);
        }}
      >
        Next
      </button>
    </div>
  );
};
