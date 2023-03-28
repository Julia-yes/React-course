import styles from './Card.module.scss';
import React from 'react';

type IProps = {
  name: string;
  img: string;
  city: string;
  likes: number;
  views: number;
};

export const Card = ({ name, img, city, likes, views }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.cardTop}>
        <div className={styles.userInfo}>
          <img src={img} className={styles.avatar} alt='avatar'></img>
          <div className={styles.content}>
            <h3 className={styles.title}>{name}</h3>
            <div className={styles.city}>{city}</div>
          </div>
        </div>
        <div className={styles.actions}>
          <span className={`material-icons ${styles.icon}`}>person_remove</span>
          <span className={`material-icons ${styles.icon}`}>mail</span>
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <span className={`material-icons ${styles.icon}`}>favorite</span>
          <span className={styles.value}>{likes}</span>
        </div>
        <div className={styles.button}>
          <span className={`material-icons ${styles.icon}`}>visibility</span>
          <span className={styles.value}>{views}</span>
        </div>
      </div>
    </div>
  );
};
