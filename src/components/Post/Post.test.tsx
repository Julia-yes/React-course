import { render, screen } from '@testing-library/react';
import { Post } from './Post';
import '@testing-library/jest-dom/extend-expect';

const mockPost = {
  title: 'title',
  category: 'work',
  description: 'hello',
  file: undefined,
  color: 'Salmon',
  date: '2023',
  key: Date.now(),
};

describe('Post', () => {
  it('render Post component', () => {
    render(
      <Post
        title={mockPost.title}
        category={mockPost.category}
        description={mockPost.description}
        file={mockPost.file}
        color={mockPost.color}
        date={mockPost.date}
        key={mockPost.key}
      />
    );
    expect(screen.getByText(/work/i)).toBeInTheDocument();
  });
});
