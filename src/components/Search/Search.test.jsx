import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import '@testing-library/jest-dom/extend-expect';
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
  it('call callback after click on button', () => {
    const changeSearchValue = jest.fn();
    render(<Search callback={changeSearchValue} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(changeSearchValue).toHaveBeenCalled();
  });
  it('call callback after type on button Enter', () => {
    const changeSearchValue = jest.fn();
    render(<Search callback={changeSearchValue} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(changeSearchValue).toHaveBeenCalled();
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
