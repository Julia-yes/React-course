import { Main } from './Main';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

describe('Main', () => {
  it('render Main component', () => {
    render(<Main />);
    expect(screen.getByText(/Characters/i)).toBeInTheDocument();
  });
  // it('displays all Users when searchValue is empty', () => {
  //   render(<Main />);
  //   const imgs = screen.getAllByRole('img');
  //   expect(imgs.length).toBe(Users.length);
  // });
});
