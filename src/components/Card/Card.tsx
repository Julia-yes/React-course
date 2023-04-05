import styles from './Card.module.scss';
import React from 'react';

type IProps = {
  name: string;
  img: string;
  status: string;
  id: number;
  callback(value: number): void;
};

export const Card = ({ name, img, status, id, callback }: IProps) => {
  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        callback(id);
      }}
    >
      <div className={styles.cardTop}>
        <div className={styles.userInfo}>
          <img src={img} className={styles.avatar} alt='avatar'></img>
          <div className={styles.content}>
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.status}>Status: {status}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
