import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Pagination } from './Pagination';
import { DataContext } from 'context/Context';
Enzyme.configure({ adapter: new Adapter() });

describe('Pagination', () => {
  it('render Pagination component', () => {
    render(<Pagination pages={8} />);
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
  });
  it('call callback after click on button Prev', async () => {
    const setNewActivePage = jest.fn();
    const setNewLoading = jest.fn();
    const setNewData = jest.fn();
    const activePage = 6;
    const searchValue = '';

    render(
      <DataContext.Provider
        value={{ activePage, setNewActivePage, setNewLoading, setNewData, searchValue }}
      >
        <Pagination pages={8} />
      </DataContext.Provider>
    );

    const button = screen.getByText('Prev');
    fireEvent.click(button);
    expect(setNewActivePage).toHaveBeenCalled();
    expect(setNewActivePage).toHaveBeenCalledWith(6 - 1);
    expect(setNewLoading).toHaveBeenCalled();
    expect(setNewLoading).toHaveBeenCalledWith(true);
  });
  it('call callback after click on button Next', () => {
    const setNewActivePage = jest.fn();
    const setNewLoading = jest.fn();
    const setNewData = jest.fn();
    const activePage = 6;
    const searchValue = 'mm';

    render(
      <DataContext.Provider
        value={{ activePage, setNewActivePage, setNewLoading, setNewData, searchValue }}
      >
        <Pagination pages={8} />
      </DataContext.Provider>
    );

    const button = screen.getByText('Next');
    fireEvent.click(button);
    expect(setNewActivePage).toHaveBeenCalled();
    expect(setNewActivePage).toHaveBeenCalledWith(6 + 1);
    expect(setNewLoading).toHaveBeenCalled();
    expect(setNewLoading).toHaveBeenCalledWith(true);
  });
});
