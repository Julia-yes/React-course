import { CreateForm } from 'components/CreateForm/CreateForm';
import { Post } from 'components/Post/Post';
import styles from './Posts.module.scss';
import { useState } from 'react';
import { useAppSelector } from 'redux/hooks';

export const Posts = () => {
  const [showForm, setShowForm] = useState(false);
  const posts = useAppSelector((state) => state.posts.posts);

  const changeshowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <section className={styles.wrapper}>
      <button className={styles.button} onClick={changeshowForm}>
        {showForm ? 'Cancel' : 'Create post'}
      </button>
      {showForm && <CreateForm />}
      <div className={styles.postWrapper}>
        {posts?.length ? (
          posts.map((post) => (
            <Post
              title={post.title}
              description={post.description}
              category={post.category}
              file={post.file}
              color={post.color}
              date={post.date}
              key={post.key}
            />
          ))
        ) : (
          <div className={styles.titleNoPosts}>No posts</div>
        )}
      </div>
    </section>
  );
};
