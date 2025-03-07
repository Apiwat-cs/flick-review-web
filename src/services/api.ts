import axios from "axios";
import { Movie } from "../types/movie";
import { Cast } from "../types/billedcast";

const API_KEY = "752d7dbc372a2f8e57119cba4121aa4e";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: { api_key: API_KEY, language: "th-TH" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: "th-TH" },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "th-TH",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId: string): Promise<Cast[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: { api_key: API_KEY, language: "th-TH" },
    });
    return res.data.cast.slice(0, 10);
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    return [];
  }
};
