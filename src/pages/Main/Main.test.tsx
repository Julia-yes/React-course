import { Main } from './Main';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

describe('Main', () => {
  it('render Main component', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByText(/Characters/i)).toBeInTheDocument();
  });
});
