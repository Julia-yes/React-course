import { render, screen, fireEvent } from '@testing-library/react';
import { Posts } from './Posts';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Posts', () => {
  it('render Posts component', () => {
    render(<Posts />);
    expect(screen.getByText(/Create post/i)).toBeInTheDocument();
  });
  it('changes state after clicking button', () => {
    render(<Posts />);
    const button = screen.getByRole('button');
    expect(screen.getByText(/Create/i)).toBeInTheDocument();
    expect(screen.queryByText(/Cancel/i)).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
    expect(screen.queryByText(/Create/i)).not.toBeInTheDocument();
  });
});
