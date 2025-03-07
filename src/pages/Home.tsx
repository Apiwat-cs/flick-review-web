import React from 'react';
import MovieSection from '../components/MovieSection';
import { fetchTrendingMovies, fetchPopularMovies } from '../services/api';

const HomePage: React.FC = () => {
  return (
    <div >
      <MovieSection title="Trending Movies" fetchFunction={fetchTrendingMovies} />
      <MovieSection title="Popular Movies" fetchFunction={fetchPopularMovies} />
    </div>
  );
};

export default HomePage;
