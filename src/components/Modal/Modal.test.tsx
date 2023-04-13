// import { render, screen } from '@testing-library/react';
// import { Modal } from './Modal';
import '@testing-library/jest-dom/extend-expect';
import Enzyme from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
Enzyme.configure({ adapter: new Adapter() });

// const mockId = 7;
// const mockImg =
//   'https://st-martin.ru/800/600/https/yt3.ggpht.com/a/AATXAJxFcL-ymGreb7CcTDH_No_ycNVpHxYdUjOBfzz8HQ=s900-c-k-c0xffffffff-no-rj-mo';
// const mockStatus = 'Alive';
// const gender = 'male';
// const type = 'human';
// const species = 'human';
// const mockCallback = jest.fn();

// describe('Modal', () => {
//   it('render Modal component', () => {
//     render(
//       <Modal
//         id={mockId}
//         callback={mockCallback}
//       />
//     );
//     expect(screen.getByText(mockName)).toBeInTheDocument();
//   });
// });
