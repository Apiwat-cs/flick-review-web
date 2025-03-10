import React, { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
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
        <h2 className="text-2xl font-bold mr-4">{title}</h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-white">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mr-4">{title}</h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
      <div className="relative z-10 mt-6 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mr-4 text-white">{title}</h2>
        <div className="flex overflow-x-scroll space-x-5 mt-4 ">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className='flex-shrink-0 rounded-lg text-center'>
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))
          ) : (
            <div className="text-white">ไม่มีรายการ</div>
          )}
        </div>
      </div>
  );
};

export default MovieSection;