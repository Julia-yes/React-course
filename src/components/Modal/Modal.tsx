import styles from './Modal.module.scss';
import React from 'react';

type IProps = {
  name: string | undefined;
  status: string | undefined;
  gender: string | undefined;
  image: string | undefined;
  type: string | undefined;
  species: string | undefined;
  callback(): void;
};

export const Modal = ({ name, image, status, gender, type, species, callback }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.userInfo}>
            <img src={image} className={styles.avatar} alt='avatar'></img>
            <div className={styles.content}>
              <h3 className={styles.title}>{name}</h3>
              <div className={styles.info}>Gender: {gender}</div>
              <div className={styles.info}>Type: {type}</div>
              <div className={styles.info}>Species: {species}</div>
              <div className={styles.info}>Status: {status}</div>
            </div>
          </div>
          <button className={styles.button} onClick={callback}>
            <span className={`material-icons ${styles.icon}`}>close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
