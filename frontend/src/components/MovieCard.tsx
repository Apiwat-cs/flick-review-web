import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';
import React, { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  rating?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, rating }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="relative group overflow-hidden rounded-lg shadow-xl transition-transform transform hover:scale-95">
        {/* Movie Poster */}
        <img
          src={movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.jpg"}
          alt={movie.title}
          className="w-full h-70 object-cover rounded-lg"
        />

        {/* Movie Rating */}
        {rating !== undefined && rating !== null && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
            {rating ? rating.toFixed(1) : "0.0"}
          </div>
        )}


        {/* Movie Title (Appears on Hover) */}
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 text-white text-center p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {movie.title}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
