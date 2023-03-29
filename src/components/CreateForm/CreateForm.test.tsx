import { render, screen, fireEvent } from '@testing-library/react';
import { CreateForm } from './CreateForm';
import '@testing-library/jest-dom/extend-expect';
import { IPost } from 'interfaces';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

const mockCallback = (prop: IPost) => {};

describe('CreateForm', () => {
  it('render CreateForm component', () => {
    render(<CreateForm callback={mockCallback} />);
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
  });
  it('should appear message with error after click submit button', () => {
    render(<CreateForm callback={mockCallback} />);
    expect(screen.queryByText(/image/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.getByText(/image/i)).toBeInTheDocument();
  });
  it('should appear message with title error after click submit button', () => {
    render(<CreateForm callback={mockCallback} />);
    expect(screen.queryByText(/short/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/submit/i));
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: {
        value: 'hello',
      },
    });
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.queryByText(/short/i)).not.toBeInTheDocument();
  });
});
