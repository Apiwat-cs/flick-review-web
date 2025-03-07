import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/api"; // ✅ ใช้ API Service

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId!);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div className="text-center text-black">กำลังโหลด...</div>;
  }

  return (
    <div className="relative w-full min-h-screen text-black">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-[450px] bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:flex md:items-center">
        {/* Movie Poster */}
        <img
          className="w-56 md:w-64 rounded-lg shadow-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Movie Info */}
        <div className="md:ml-8 mt-6 md:mt-0 flex-1">
          {/* Title */}
          <h1 className="text-4xl font-bold">{movie.title} <span className="text-black">({new Date(movieId!).getFullYear()})</span></h1>

          {/* User Score */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="w-12 h-12 flex items-center justify-center bg-green-600 text-white font-bold rounded-full shadow-md">
              {movie.vote_average.toFixed(1)}%
            </div>
            <span className="text-black">คะแนนของผู้ใช้</span>
          </div>

          {/* Overview */}
          <h2 className="mt-4 text-lg font-semibold">Overview</h2>
          <p className="mt-2 text-black">{movie.overview}</p>

          {/* Genres */}
          <div className="mt-4">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="bg-gray-800 text-gray-200 px-3 py-1 rounded-md mr-2 text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
