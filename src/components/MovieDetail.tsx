import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCast } from "../services/api";
import ReviewMovie from "./ReviewMovie";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId!);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const getMovieCast = async () => {
      try {
        const data = await fetchMovieCast(movieId!);
        if (Array.isArray(data)) {
          setCast(data.slice(0, 10)); // ดึงนักแสดง 10 คนแรก
        } else {
          console.error("Invalid cast data:", data);
          setCast([]); // กรณีไม่มีข้อมูลนักแสดง
        }
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    getMovieDetails();
    getMovieCast();

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
          <h1 className="text-4xl font-bold">
            {movie.title} 
          </h1>

          {/* User Score */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="w-15 h-8 flex items-center justify-center bg-green-600 text-white font-bold rounded-lg shadow-md">
              {movie.vote_average.toFixed(1)}/10
            </div>
            <span className="text-black font-semibold">คะแนนของผู้ใช้</span>
          </div>

          {/* Overview */}
          <h2 className="mt-4 text-xl font-bold">Overview</h2>
          <p className="mt-2 text-black text-mg">{movie.overview}</p>

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

      {/* Top Billed Cast */}
      <div className="relative z-10 mt-6 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold">Top Billed Cast</h2>
        <div className="mt-4 flex overflow-x-scroll space-x-4">
          {cast.length > 0 ? (
            cast.map((actor) => (
              <div key={actor.id} className="w-40 flex-shrink-0 bg-gray-900 p-1 pt-2 rounded-lg text-center">
                <img
                  className="w-full h-40 object-cover rounded-lg"
                  src={actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "/placeholder.jpg"} 
                  alt={actor.name}
                />
                <p className="mt-2 text-white font-semibold">{actor.name}</p>
                <p className="text-gray-400 text-sm">{actor.character}</p>
              </div>
            ))
          ) : (
            <div className="text-white">No cast available</div>
          )}
        </div>
      </div>
      {/* Review Section */}
      <div className="relative z-10 mt-6 px-4 max-w-6xl mx-auto">
        <ReviewMovie movieId={movieId!} />
      </div>    
    </div>
  );
};

export default MovieDetail;
