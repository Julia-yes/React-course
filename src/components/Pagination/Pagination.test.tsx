import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Pagination } from './Pagination';
Enzyme.configure({ adapter: new Adapter() });

describe('Pagination', () => {
  const mockCallback = jest.fn();
  it('render Pagination component', () => {
    render(<Pagination activePage={6} coutOfPages={15} callback={mockCallback} />);
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
  });
});
