import React from 'react';
import MovieSection from '../components/MovieSection';
import { fetchTrendingMovies, fetchPopularMovies } from '../services/api';

const HomePage: React.FC = () => {
  return (
    <div className=' relative z-10 mt-6 px-4 max-w-6xl mx-auto'>
      <MovieSection title="กำลังมาแรง" fetchFunction={fetchTrendingMovies} />
      <MovieSection title="กำลังเป็นที่นิยม" fetchFunction={fetchPopularMovies} />
    </div>
  );
};

export default HomePage;
