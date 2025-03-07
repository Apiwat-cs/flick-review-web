import React, { useEffect, useState, useRef } from 'react';
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

  const movieRef = useRef<HTMLDivElement | null>(null);  // ใช้ ref สำหรับอ้างอิง container ของการเลื่อน

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

  const handleScroll = (direction: 'left' | 'right') => {
    if (movieRef.current) {
      const scrollAmount = 300; // ระยะการเลื่อน
      if (direction === 'right') {
        movieRef.current.scrollLeft += scrollAmount;
      } else {
        movieRef.current.scrollLeft -= scrollAmount;
      }
    }
  };

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
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4" ref={movieRef}>
          {movies.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {/* ปุ่มเลื่อนซ้าย */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={() => handleScroll('left')}
        >
          &lt;
        </button>

        {/* ปุ่มเลื่อนขวา */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={() => handleScroll('right')}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default MovieSection;
