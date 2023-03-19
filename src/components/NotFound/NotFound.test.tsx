import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';
import '@testing-library/jest-dom/extend-expect';

describe('NotFound', () => {
  it('render AboutUs component', () => {
    render(<NotFound />);
    expect(screen.getByText(/not/i)).toBeInTheDocument();
  });
});
