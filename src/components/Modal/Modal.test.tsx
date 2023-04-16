import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
Enzyme.configure({ adapter: new Adapter() });

const mockId = 7;
const mockCallback = jest.fn();

describe('Modal', () => {
  it('render Modal component', () => {
    render(
      <Provider store={store}>
        <Modal id={mockId} callback={mockCallback} />
      </Provider>
    );
    expect(screen.getByText(/Gender/i)).toBeInTheDocument();
  });
});
