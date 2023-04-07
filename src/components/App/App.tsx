import { Header } from 'components/Header/Header';
import { Main } from 'pages/Main/Main';
import { Posts } from 'pages/Posts/Posts';
import { Route, Routes } from 'react-router-dom';
import { AboutUs } from '../../pages/AboutUs/AboutUs';
import { NotFound } from '../NotFound/NotFound';
import { DataProvider } from 'context/Context';

export const App = () => {
  return (
    <DataProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </DataProvider>
  );
};
