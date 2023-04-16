import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Pagination } from './Pagination';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
Enzyme.configure({ adapter: new Adapter() });

describe('Pagination', () => {
  it('render Pagination component', async () => {
    render(
      <Provider store={store}>
        <Pagination pages={8} />
      </Provider>
    );
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
    const prev = screen.getByText(/prev/i);
    const next = screen.getByText(/next/i);
    expect(prev).toBeDisabled();
    expect(next).not.toBeDisabled();
    fireEvent.click(next);
    await waitFor(() => {
      expect(prev).not.toBeDisabled();
    });
  });
});
