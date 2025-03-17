import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchSearchMovies } from '../services/api';
import { Movie } from '../types/movie';

const SearchMovie: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;

            setLoading(true);
            setError(null);

            try {
                const results = await fetchSearchMovies(query);
                setMovies(results);
            } catch (err) {
                setError('เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง');
                console.error('Search error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#1a1a2e]">
                <div className="text-white">กำลังโหลด...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#1a1a2e]">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1a2e] p-4">
            <div className="max-w-4xl mx-auto py-4">
                <h1 className="text-white text-2xl mb-6">ผลการค้นหา: {query}</h1>

                {movies.length === 0 ? (
                    <div className="text-white">ไม่พบผลลัพธ์สำหรับ "{query}"</div>
                ) : (
                    <div className="space-y-4">
                        {movies.map((movie) => (
                            <Link
                                to={`/movie/${movie.id}`}
                                key={movie.id}
                                className="flex bg-[#262648] rounded-md overflow-hidden hover:bg-[#303060] transition-colors"
                            >
                                <div className="w-24 h-36 sm:w-32 sm:h-48 flex-shrink-0">
                                    <img
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '/placeholder.jpg'}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4 text-white">
                                    <h2 className="text-lg font-semibold">{movie.title}</h2>
                                    <div className="text-sm text-gray-300 mt-1">
                                        <span>{new Date(movie.release_date).getFullYear() || 'N/A'}</span> •
                                        <span>{movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A'}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                                        {movie.overview || 'ไม่มีคำอธิบาย'}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchMovie;