import { fireEvent, render, screen } from '@testing-library/react';
import { Card } from './Card';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
Enzyme.configure({ adapter: new Adapter() });

const mockName = 'Tim';
const mockImg =
  'https://st-martin.ru/800/600/https/yt3.ggpht.com/a/AATXAJxFcL-ymGreb7CcTDH_No_ycNVpHxYdUjOBfzz8HQ=s900-c-k-c0xffffffff-no-rj-mo';
const mockStatus = 'Alive';
const mockId = 56;

describe('Card', () => {
  it('render Card component', () => {
    const mockCallback = jest.fn();
    render(
      <Card name={mockName} img={mockImg} status={mockStatus} id={mockId} callback={mockCallback} />
    );
    expect(screen.getByText(mockName)).toBeInTheDocument();
  });
  it('call callback after click on card with card id', () => {
    const mockCallback = jest.fn();
    render(
      <Card name={mockName} img={mockImg} status={mockStatus} id={mockId} callback={mockCallback} />
    );
    fireEvent.click(screen.getByRole('heading'));
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledWith(mockId);
  });
});
