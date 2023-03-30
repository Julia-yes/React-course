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
  it('background color must be Salmon if this variant is checked', () => {
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
    const sectionElement = screen.getByTestId('sectionTest');
    expect(sectionElement).toHaveStyle('background-color: #fb8372');
  });
  it('background color must not be Salmon if this variant is not checked', () => {
    render(
      <Post
        title={mockPost.title}
        category={mockPost.category}
        description={mockPost.description}
        file={mockPost.file}
        color='Red'
        date={mockPost.date}
        key={mockPost.key}
      />
    );
    const sectionElement = screen.getByTestId('sectionTest');
    expect(sectionElement).toHaveStyle('background-color: #6bc8be');
  });
});
