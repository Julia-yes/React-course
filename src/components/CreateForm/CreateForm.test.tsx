import { render, screen } from '@testing-library/react';
import { CreateForm } from './CreateForm';
import '@testing-library/jest-dom/extend-expect';
import { IPost } from 'interfaces';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

const mockCallback = (prop: IPost) => {};
const mockcloseForm = () => {};

describe('CreateForm', () => {
  it('render CreateForm component', () => {
    render(<CreateForm callback={mockCallback} closeForm={mockcloseForm} />);
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
  });
  it('should toggle isDate state when checkbox is clicked', () => {
    const wrapper = shallow(<CreateForm callback={mockCallback} closeForm={mockcloseForm} />);
    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(wrapper.state('isDate')).toBe(false);
    checkbox.simulate('change');
    expect(wrapper.state('isDate')).toBe(true);
    checkbox.simulate('change');
    expect(wrapper.state('isDate')).toBe(false);
  });
});
