import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/Home';
import MovieDetail from './components/MovieDetail';
import Login from './pages/auth/Login';
import React from 'react';
import Register from './pages/auth/Register';

function App() {
  return (
      <div className='bg-[#f5f5f5]'>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </Router>
      </div>
  );
}

export default App;
