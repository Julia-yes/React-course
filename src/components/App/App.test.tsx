import { render, screen } from '@testing-library/react';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

describe('App', () => {
  it('render App component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
