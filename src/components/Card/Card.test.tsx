import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
Enzyme.configure({ adapter: new Adapter() });

const mockName = 'Tim';
const mockCity = 'Minsk';
const mockImg =
  'https://st-martin.ru/800/600/https/yt3.ggpht.com/a/AATXAJxFcL-ymGreb7CcTDH_No_ycNVpHxYdUjOBfzz8HQ=s900-c-k-c0xffffffff-no-rj-mo';
const mockLikes = 28;
const mockViews = 100;

describe('Card', () => {
  it('render Card component', () => {
    render(
      <Card name={mockName} city={mockCity} img={mockImg} likes={mockLikes} views={mockViews} />
    );
    expect(screen.getByText(mockName)).toBeInTheDocument();
  });
});
