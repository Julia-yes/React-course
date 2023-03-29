import { CreateForm } from 'components/CreateForm/CreateForm';
import { Post } from 'components/Post/Post';
import { IPost } from 'interfaces';
import styles from './Posts.module.scss';
import { useCallback, useState } from 'react';

export const Posts = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState<IPost[] | null>(null);

  const changeshowForm = () => {
    setShowForm(!showForm);
  };

  const setNewPost = useCallback(
    (post: IPost) => {
      posts ? setPosts([...posts, post]) : setPosts([post]);
    },
    [posts]
  );

  return (
    <section className={styles.wrapper}>
      <button className={styles.button} onClick={changeshowForm}>
        {showForm ? 'Cancel' : 'Create post'}
      </button>
      {showForm && <CreateForm callback={setNewPost} />}
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
