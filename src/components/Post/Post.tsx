import { IPost } from 'interfaces';
import styles from './Post.module.scss';

export const Post = ({ title, category, description, file, color, date }: IPost) => {
  return (
    <section
      className={styles.wrapper}
      data-testid='sectionTest'
      style={{
        backgroundColor: color === 'Salmon' ? '#fb8372' : '#6bc8be',
      }}
    >
      <h2 className={styles.title}>{title}</h2>
      <img src={file} alt='file' className={styles.img}></img>
      <div className={styles.category}>{category}</div>
      {description && description?.length > 1 && (
        <div className={styles.description}>{description}</div>
      )}
      <div className={styles.date}>{date}</div>
    </section>
  );
};
