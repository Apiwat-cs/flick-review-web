import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
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
  const scrollRef = useRef<HTMLDivElement>(null); // Ref สำหรับ scroll
  const [userReviewAverage, setUserReviewAverage] = useState<number>(0);

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

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

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
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      
      {/* ปุ่มซ้าย */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/50 text-white rounded-full z-20 hover:bg-red-600 transition "

        aria-label="Scroll Left"
      >
        <IoIosArrowBack size={30}/>
      </button>

      {/* รายการหนัง */}
      <div ref={scrollRef} className="flex space-x-5 mt-4 overflow-hidden scroll-smooth">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 rounded-lg text-center">
              <MovieCard key={movie.id} movie={movie} rating={Number(movie.vote_average.toFixed(1))}/>
            </div>
          ))
        ) : (
          <div className="text-white">ไม่มีรายการ</div>
        )}
      </div>

      {/* ปุ่มขวา */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-black/50 text-white rounded-full z-20 hover:bg-red-600 transition "
        aria-label="Scroll Right"
      >
        <IoIosArrowForward size={30}/>
      </button>
    </div>
  );
};

export default MovieSection;
