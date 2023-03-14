import { Route, Routes } from 'react-router-dom';
import { AboutUs } from '../../pages/AboutUs/AboutUs';
import { NotFound } from '../NotFound/NotFound';

export const App = () => {
  return (
    <div className='main'>
      <Routes>
        <Route path='/' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};
