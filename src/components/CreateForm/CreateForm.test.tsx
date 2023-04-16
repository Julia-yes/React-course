import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreateForm } from './CreateForm';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateForm', () => {
  it('render CreateForm component', () => {
    render(
      <Provider store={store}>
        <CreateForm />
      </Provider>
    );
    expect(screen.getByText(/Work/i)).toBeInTheDocument();
  });
  it('error message must diaspear after contein the field', async () => {
    render(
      <Provider store={store}>
        <CreateForm />
      </Provider>
    );
    expect(screen.queryByText(/short/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByText(/submit/i));
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: {
        value: 'hello',
      },
    });
    fireEvent.click(screen.getByText(/submit/i));
    await waitFor(() => {
      expect(screen.queryByText(/short/i)).not.toBeInTheDocument();
    });
  });
  it('should show error message when file is not selected', async () => {
    render(
      <Provider store={store}>
        <CreateForm />
      </Provider>
    );
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(screen.getByText(/add photo/i)).toBeInTheDocument();
    });
  });
  it('should show message when form was submited', async () => {
    render(
      <Provider store={store}>
        <CreateForm />
      </Provider>
    );
    const file = new File(['hello'], 'image-hello.png', { type: 'image/png' });
    const input: HTMLInputElement = screen.getByTestId('sectionTest');
    await waitFor(() => expect(input.files).toHaveLength(0));
    fireEvent.change(input, { target: { files: [file] } });
    expect(input.files).toHaveLength(1);
  });
});
