import { Header } from 'components/Header/Header';
import { Main } from 'pages/Main/Main';
import { Posts } from 'pages/Posts/Posts';
import { Route, Routes } from 'react-router-dom';
import { AboutUs } from '../../pages/AboutUs/AboutUs';
import { NotFound } from '../NotFound/NotFound';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { fetchData } from 'redux/searchReducer';

export const App = () => {
  const search = useAppSelector((state) => state.data.search);
  const page = useAppSelector((state) => state.data.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData({ search: search, page: page }));
  });

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
};
