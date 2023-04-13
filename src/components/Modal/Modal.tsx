import { useGetCharacterQuery } from 'redux/API';
import styles from './Modal.module.scss';

type IProps = {
  id: number | null;
  callback(): void;
};

export const Modal = ({ id, callback }: IProps) => {
  const { data, error, isFetching } = useGetCharacterQuery(id);
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.userInfo}>
            {isFetching ? (
              <div className={styles.loaderWrapper}>
                <span className={styles.loader}></span>
              </div>
            ) : (
              <img src={data?.image} className={styles.avatar} alt='avatar'></img>
            )}
            {error ? (
              <div>Something wrong</div>
            ) : (
              <div className={styles.content}>
                <h3 className={styles.title}>{isFetching ? `Loading...` : data?.name}</h3>
                <div className={styles.info}>Gender: {data?.gender}</div>
                <div className={styles.info}>Type: {data?.type}</div>
                <div className={styles.info}>Species: {data?.species}</div>
                <div className={styles.info}>Status: {data?.status}</div>
              </div>
            )}
          </div>
          <button className={styles.button} onClick={callback}>
            <span className={`material-icons ${styles.icon}`}>close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
