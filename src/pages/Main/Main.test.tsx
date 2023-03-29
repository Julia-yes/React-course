import { Main } from './Main';
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

Enzyme.configure({ adapter: new Adapter() });

// describe('Main', () => {
//   it('render Main component', () => {
//     const app = shallow(<Main />);
//     expect(app.state().searchValue).toEqual('');
//   });
// });
