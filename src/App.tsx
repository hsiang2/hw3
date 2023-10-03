import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import AddBookPage from './pages/AddBook';
import { useDispatch } from 'react-redux';
import { getBooks } from './redux/bookSlice';
import BookPage from './pages/BookDetail';
import UpdateBookPage from './pages/UpdateBook';
import Header from './components/Header';

function App() {
  const dispatch = useDispatch<any>()
  
  useEffect(()=> {
    dispatch(getBooks())
  }, [dispatch])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='addBook' element={<AddBookPage />} />
        <Route path='book/:bookId' element={<BookPage />} />
        <Route path='update/:bookId' element={<UpdateBookPage />} />
        {/* <Route path='/:keyword' element={<HomePage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
