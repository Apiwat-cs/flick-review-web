import React, { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import SectionHeader from './SectionHeader';
import MovieCard from './MovieCard';

interface MovieSectionProps {
  title: string;
  fetchFunction: () => Promise<Movie[]>;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, fetchFunction }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchFunction();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [fetchFunction]);

  if (loading) {
    return (
      <div className="mb-12">
        <SectionHeader title={title} />
        <div className="flex justify-center items-center h-64">
          <p className="text-white">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12">
        <SectionHeader title={title} />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 mx-4">
      <SectionHeader title={title} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {movies.slice(0, 8).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieSection;
