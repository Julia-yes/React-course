import { IPost } from 'interfaces';
import styles from './Post.module.scss';

export const Post = ({ title, category, description, isDate, file, color, date }: IPost) => {
  return (
    <section
      className={styles.wrapper}
      style={{
        backgroundColor:
          color === 'Salmon' ? '#fb8372' : color === 'Turquoise' ? '#6bc8be' : '#FFFFFF',
      }}
    >
      <h2 className={styles.title}>{title}</h2>
      <img src={file} alt='file' className={styles.img}></img>
      <div className={styles.category}>{category}</div>
      {description && description?.length > 1 && (
        <div className={styles.description}>{description}</div>
      )}
      {isDate && <div className={styles.date}>{date}</div>}
    </section>
  );
};
