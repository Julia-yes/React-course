import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import '@testing-library/jest-dom/extend-expect';

describe('Main', () => {
  it('render App component', () => {
    render(<Main />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
