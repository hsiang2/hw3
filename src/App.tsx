import React, { useEffect } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBooks } from './redux/bookSlice';
import Header from './components/Header';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';
import UpdateBook from './pages/UpdateBook';
import NotFound from './pages/NotFound';

function App() {
  const dispatch = useDispatch<any>()
  
  useEffect(()=> {
    dispatch(getBooks())
  }, [dispatch])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='addBook' element={<UpdateBook />} />
        <Route path='book/:bookId' element={<BookDetail />} />
        <Route path='update/:bookId' element={<UpdateBook />} />
        <Route path='/404' element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
        {/* <Route path='/:keyword' element={<HomePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
