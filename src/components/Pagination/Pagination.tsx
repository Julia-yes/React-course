import styles from './Pagination.module.scss';

type IProps = {
  callback(value: number): void;
  activePage: number;
  coutOfPages: number;
};

export const Pagination = ({ callback, activePage, coutOfPages }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={activePage === 1 ? `${styles.button} ${styles.buttonDisable}` : styles.button}
        onClick={() => callback(activePage - 1)}
        disabled={activePage === 1 ? true : false}
      >
        Prev
      </button>
      <div className={styles.info} data-testid='sectionTest'>
        Page {activePage} of {coutOfPages}
      </div>
      <button
        className={
          activePage === coutOfPages ? `${styles.button} ${styles.buttonDisable}` : styles.button
        }
        disabled={activePage === coutOfPages ? true : false}
        onClick={() => callback(activePage + 1)}
      >
        Next
      </button>
    </div>
  );
};
