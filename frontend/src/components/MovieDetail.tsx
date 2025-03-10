import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCast, getReviews } from "../services/api";
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

interface Review {
  _id: string;
  movieId: string;
  username: string;
  rating: number;
  review: string;
  createdAt: string;
}

const MovieDetail: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReviewAverage, setUserReviewAverage] = useState<number>(0);

  useEffect(() => {
    if (!movieId) {
      setError("Movie ID is missing!");
      setIsLoading(false);
      return;
    }

    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details");
      }
    };

    const getMovieCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movie credits:", error);
        setCast([]);
      }
    };

    const getMovieReviews = async () => {
      try {
        const data = await getReviews(movieId);
        setReviews(data);
        calculateUserReviewAverage(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
        setUserReviewAverage(0);
      }
    };

    const calculateUserReviewAverage = (reviews: Review[]) => {
      if (reviews.length === 0) {
        setUserReviewAverage(0);
        return;
      }
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      setUserReviewAverage(totalRating / reviews.length);
    };

    getMovieDetails();
    getMovieCast();
    getMovieReviews();

    setIsLoading(false);
  }, [movieId]);

  if (isLoading) {
    return <div className="text-center text-black">กำลังโหลด...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!movie) {
    return <div className="text-center text-black">ไม่พบข้อมูลภาพยนตร์</div>;
  }

  return (
    <div className="relative w-full min-h-screen text-black">
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-[450px] bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col items-center sm:flex-row sm:items-center">
        {/* Movie Poster */}
        <img
          className="w-64 sm:w-56 rounded-lg shadow-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        {/* Movie Info */}
        <div className="sm:ml-8 mt-10 sm:mt-0 flex-1 ">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <div className="mt-4 flex items-center space-x-4">
            <div className="w-15 h-8 flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900 text-white font-bold rounded-lg shadow-md">
              {userReviewAverage ? userReviewAverage.toFixed(1) : "0.0"}/10
            </div>
            <span className="text-black font-semibold">คะแนนของผู้ใช้</span>
          </div>

          <h2 className="mt-4 text-xl font-bold">ภาพรวม</h2>
          <p className="mt-2 text-black text-mg">{movie.overview}</p>

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
        <h2 className="text-2xl font-bold">นักแสดงหลัก</h2>
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
            <div className="text-black">ไม่มีรายการ</div>
          )}
        </div>
      </div>

      {/* Review Section */}
      <div className="relative z-10 mt-6 px-4 max-w-6xl mx-auto">
        <ReviewMovie movieId={movieId} />
      </div>    
    </div>
  );
};

export default MovieDetail;
