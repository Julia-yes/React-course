import { CreateForm } from 'components/CreateForm/CreateForm';
import { Post } from 'components/Post/Post';
import { IPost } from 'interfaces';
import React from 'react';
import styles from './Posts.module.scss';

type Props = {
  props?: string;
};

export class Posts extends React.Component<Props, { showForm: boolean; posts: IPost[] | null }> {
  constructor(props: Props) {
    super(props);
    this.state = { showForm: false, posts: [] };
    this.changeshowForm = this.changeshowForm.bind(this);
    this.setNewPost = this.setNewPost.bind(this);
  }

  changeshowForm() {
    this.setState({
      showForm: !this.state.showForm,
    });
  }

  setNewPost(post: IPost) {
    const postsUpdate = this.state.posts ? this.state.posts : [];
    postsUpdate?.push(post);
    this.setState({
      posts: postsUpdate,
    });
  }

  render() {
    return (
      <section className={styles.wrapper}>
        <button className={styles.button} onClick={this.changeshowForm}>
          {this.state.showForm ? 'Cancel' : 'Create post'}
        </button>
        {this.state.showForm && (
          <CreateForm callback={this.setNewPost} closeForm={this.changeshowForm} />
        )}
        <div className={styles.postWrapper}>
          {this.state.posts?.length ? (
            this.state.posts.map((post) => (
              <Post
                title={post.title}
                description={post.description}
                category={post.category}
                isDate={post.isDate}
                file={post.file}
                color={post.color}
                date={post.date}
                key={post.title}
              />
            ))
          ) : (
            <div className={styles.titleNoPosts}>No posts</div>
          )}
        </div>
      </section>
    );
  }
}
