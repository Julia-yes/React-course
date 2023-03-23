import { render, screen } from '@testing-library/react';
import { Posts } from './Posts';
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

describe('Posts', () => {
  it('render Posts component', () => {
    render(<Posts />);
    expect(screen.getByText(/Create post/i)).toBeInTheDocument();
  });
  it('change state after click button create post', () => {
    const wrapper = shallow(<Posts />);
    const create = wrapper.find('button');
    expect(wrapper.state('showForm')).toBe(false);
    create.simulate('click');
    expect(wrapper.state('showForm')).toBe(true);
  });
});
