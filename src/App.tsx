import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import { useDispatch } from 'react-redux';
import { getBooks } from './redux/bookSlice';
import BookPage from './pages/BookPage';

function App() {
  const dispatch = useDispatch<any>()
  dispatch(getBooks())
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='addBook' element={<AddBookPage />} />
        <Route path='id/:bookId' element={<BookPage />} />
        {/* <Route path='book/:bookID' element={}/> */}
      </Routes>
    </div>
  );
}

export default App;
