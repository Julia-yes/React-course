import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { DataContext } from '../../context/Context';
Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => {
  it('render Search component', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
  it('input value depend on state of component', () => {
    render(<Search />);
    userEvent.type(screen.getByRole('textbox'), 'test');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  const setNewValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should set the search value in local storage when submitting the form', () => {
    render(
      <DataContext.Provider value={{ setNewValue }}>
        <Search />
      </DataContext.Provider>
    );

    const input = screen.getByPlaceholderText('search');
    const button = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(button);

    expect(localStorage.getItem('search')).toBe('Morty');
  });

  it('should set the search value in context when submitting the form', () => {
    render(
      <DataContext.Provider value={{ setNewValue }}>
        <Search />
      </DataContext.Provider>
    );

    const input = screen.getByPlaceholderText('search');
    const button = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.click(button);

    expect(setNewValue).toHaveBeenCalled();
    expect(setNewValue).toHaveBeenCalledWith('Morty');
  });

  it('should set the search value in context when press Enter', () => {
    render(
      <DataContext.Provider value={{ setNewValue }}>
        <Search />
      </DataContext.Provider>
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(setNewValue).toHaveBeenCalled();
  });

  it('must change state after change input value', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((initialState) => [initialState, setState]);
    const changeSearchValue = jest.fn();
    render(<Search callback={changeSearchValue} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith('test');
  });
});
