import { render, screen } from '@testing-library/react';
import { AboutUs } from './AboutUs';
import '@testing-library/jest-dom/extend-expect';

describe('AboutUs', () => {
  it('render AboutUs component', () => {
    render(<AboutUs />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
