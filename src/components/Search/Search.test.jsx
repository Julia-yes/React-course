import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => {
  it('render Search component', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
  it('input value depend on state of component', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    userEvent.type(screen.getByRole('textbox'), 'test');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
  it('change search content after click button', async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const search = screen.getByRole('textbox');
    expect(search).toHaveValue('');
    fireEvent.change(search, {
      target: {
        value: 'test',
      },
    });
    await waitFor(() => {
      expect(search).toHaveValue('test');
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should not set the search value in context when press Esc', async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const search = screen.getByRole('textbox');
    expect(search).toHaveValue('');
    fireEvent.change(search, {
      target: {
        value: 'test',
      },
    });
    fireEvent.keyDown(search, { key: 'Esc', code: 'Esc' });
    await waitFor(() => {
      <Provider store={store}>
        <Search />
      </Provider>;
    });
    expect(search).toHaveValue('test');
  });
  it('should set the search value in context when press Enter', async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const search = screen.getByRole('textbox');
    expect(search).toHaveValue('');
    fireEvent.change(search, {
      target: {
        value: 'test',
      },
    });
    fireEvent.keyDown(search, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      <Provider store={store}>
        <Search />
      </Provider>;
    });
    expect(search).toHaveValue('test');
  });
});
