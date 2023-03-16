import styles from './Card.module.scss';
import React from 'react';

type Props = {
  name: string;
  img: string;
  city: string;
  likes: number;
  views: number;
};

export class Card extends React.Component<Props, { searchValue: string }> {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.cardTop}>
          <div className={styles.userInfo}>
            <img src={this.props.img} className={styles.avatar} alt='avatar'></img>
            <div className={styles.content}>
              <h3 className={styles.title}>{this.props.name}</h3>
              <div className={styles.city}>{this.props.city}</div>
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
            <span className={styles.value}>{this.props.likes}</span>
          </div>
          <div className={styles.button}>
            <span className={`material-icons ${styles.icon}`}>visibility</span>
            <span className={styles.value}>{this.props.views}</span>
          </div>
        </div>
      </div>
    );
  }
}
