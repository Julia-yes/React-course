import styles from './Pagination.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setNewPage } from 'redux/searchReducer';

type IProps = {
  pages: number | null;
};

export const Pagination = ({ pages }: IProps) => {
  const page = useAppSelector((state) => state.data.page);
  const dispatch = useAppDispatch();

  const changePage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newValue = e.currentTarget.innerHTML === 'Prev' ? page - 1 : page + 1;
    dispatch(setNewPage(newValue));
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={page === 1 ? `${styles.button} ${styles.buttonDisable}` : styles.button}
        onClick={async (e) => {
          changePage(e);
        }}
        disabled={page === 1 ? true : false}
      >
        Prev
      </button>
      <div className={styles.info} data-testid='sectionTest'>
        Page {page} of {pages}
      </div>
      <button
        className={page === pages ? `${styles.button} ${styles.buttonDisable}` : styles.button}
        disabled={page === pages ? true : false}
        onClick={async (e) => {
          changePage(e);
        }}
      >
        Next
      </button>
    </div>
  );
};
