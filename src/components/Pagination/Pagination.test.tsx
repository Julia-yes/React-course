import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Pagination } from './Pagination';
Enzyme.configure({ adapter: new Adapter() });

describe('Pagination', () => {
  it('render Pagination component', () => {
    render(<Pagination />);
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
  });
  // it('call callback after click on button Prev', () => {
  //   render(<Pagination activePage={6} coutOfPages={15} callback={mockCallback} />);
  //   const button = screen.getByText('Prev');
  //   fireEvent.click(button);
  //   expect(mockCallback).toHaveBeenCalled();
  //   expect(mockCallback).toHaveBeenCalledWith(6 - 1);
  // });
  // it('call callback after click on button Next', () => {
  //   render(<Pagination activePage={6} coutOfPages={15} callback={mockCallback} />);
  //   const buttonNext = screen.getByText('Next');
  //   fireEvent.click(buttonNext);
  //   expect(mockCallback).toHaveBeenCalled();
  //   expect(mockCallback).toHaveBeenCalledWith(6 + 1);
  // });
  // it('text on buttons', () => {
  //   render(<Pagination activePage={6} coutOfPages={15} callback={mockCallback} />);
  //   const text = screen.getByTestId('sectionTest');
  //   expect(text.innerHTML).toBe('Page 6 of 15');
  // });
});
