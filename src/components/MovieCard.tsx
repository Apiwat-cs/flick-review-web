import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  rating?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, rating }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="relative group overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105">
        {/* Movie Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-70 object-cover rounded-lg"
        />

        {/* Movie Rating */}
        {rating !== undefined && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded">
            ⭐ {rating}%
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
