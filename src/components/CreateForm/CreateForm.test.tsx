import { render, screen, fireEvent } from '@testing-library/react';
import { CreateForm } from './CreateForm';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateForm', () => {
  const mockCallback = jest.fn();
  beforeEach(() => {
    mockCallback.mockReset();
  });
  it('render CreateForm component', () => {
    render(<CreateForm callback={mockCallback} />);
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
  });
  it('should appear message with error after click submit button', () => {
    render(<CreateForm callback={mockCallback} />);
    expect(screen.queryByText(/add/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/submit/i));
    expect(screen.getByText(/add/i)).toBeInTheDocument();
  });
  it('error message must diaspear after contein the field', () => {
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
  it('should show error message when file is not selected', () => {
    render(<CreateForm callback={mockCallback} />);
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/add photo/i)).toBeInTheDocument();
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
