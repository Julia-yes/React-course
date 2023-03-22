import { render, screen } from '@testing-library/react';
import { Post } from './Post';
import '@testing-library/jest-dom/extend-expect';

const mockPost = {
  title: 'title',
  category: 'work',
  description: 'hello',
  isDate: false,
  file: undefined,
  color: 'Salmon',
  date: '2023',
};

const mockPostWithData = {
  title: 'title',
  category: 'work',
  description: 'hello',
  isDate: true,
  file: undefined,
  color: 'Salmon',
  date: '2023',
};

describe('Post', () => {
  it('render Post component', () => {
    render(
      <Post
        title={mockPost.title}
        category={mockPost.category}
        description={mockPost.description}
        isDate={mockPost.isDate}
        file={mockPost.file}
        color={mockPost.color}
      />
    );
    expect(screen.getByText(/work/i)).toBeInTheDocument();
  });
  it('render Post component with data, if isDate = true', () => {
    render(
      <Post
        title={mockPostWithData.title}
        category={mockPostWithData.category}
        description={mockPostWithData.description}
        isDate={mockPostWithData.isDate}
        file={mockPostWithData.file}
        color={mockPostWithData.color}
        date={mockPostWithData.date}
      />
    );
    expect(screen.getByText(/2023/i)).toBeInTheDocument();
  });
  it('render Post component without data, if isDate = false', () => {
    render(
      <Post
        title={mockPost.title}
        category={mockPost.category}
        description={mockPost.description}
        isDate={mockPost.isDate}
        file={mockPost.file}
        color={mockPost.color}
        date={mockPost.date}
      />
    );
    expect(screen.queryByText('2023')).not.toBeInTheDocument();
  });
});
