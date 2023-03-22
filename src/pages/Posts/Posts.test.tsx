import { render, screen } from '@testing-library/react';
import { Posts } from './Posts';
import '@testing-library/jest-dom/extend-expect';

describe('Posts', () => {
  it('render Posts component', () => {
    render(<Posts />);
    expect(screen.getByText(/Create post/i)).toBeInTheDocument();
  });
});
