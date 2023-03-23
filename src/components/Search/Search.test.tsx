import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => {
  it('render Search component', () => {
    const changeSearchValue = jest.fn();
    render(<Search callback={changeSearchValue} />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
  it('input value depend on state of component', () => {
    const changeSearchValue = jest.fn();
    render(<Search callback={changeSearchValue} />);
    userEvent.type(screen.getByRole('textbox'), 'test');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
  it('change state after change input value', () => {
    const changeSearchValue = jest.fn();
    const search = shallow(<Search callback={changeSearchValue} />);
    expect(search.state('searchValue')).toEqual('');
    search.find('input').simulate('change', {
      currentTarget: { value: 'test' },
    });
    expect(search.state('searchValue')).toEqual('test');
  });
  it('updates searchValue after changing search in local storage', () => {
    const callback = jest.fn();
    const searchValue = 'apple';
    render(<Search callback={callback} />);
    const input = screen.getByPlaceholderText('search');
    fireEvent.change(input, { target: { value: searchValue } });
    expect(callback).toHaveBeenCalledWith(searchValue);
    localStorage.setItem('search', searchValue);
    render(<Search callback={callback} />);
    expect((input as HTMLInputElement).value).toBe(searchValue);
  });
});
