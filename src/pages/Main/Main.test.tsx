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
  // it('updates searchValue after changing search in local storage', () => {
  //   const callback = jest.fn();
  //   const searchValue = 'apple';
  //   render(<Search callback={callback} />);
  //   const input = screen.getByPlaceholderText('search');
  //   fireEvent.change(input, { target: { value: searchValue } });
  //   expect(callback).toHaveBeenCalledWith(searchValue);
  //   localStorage.setItem('search', searchValue);
  //   render(<Search callback={callback} />);
  //   expect((input as HTMLInputElement).value).toBe(searchValue);
  // });
});
