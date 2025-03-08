import { User, LoginCredentials, RegisterCredentials, AuthResponse } from './../types/user';
import axios from "axios";
import { Movie } from "../types/movie";
import { Cast } from "../types/billedcast";

const API_URL = 'http://localhost:5000/api/reviews/:movieId';
const API_KEY = "752d7dbc372a2f8e57119cba4121aa4e";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
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

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      try {
          const response = await api.post<AuthResponse>('/auth/login', credentials);
          return response.data;
      } catch (error) {
          if (axios.isAxiosError(error)) {
              if (error.response) {
                  // Backend returned an error response
                  console.error("Login failed:", error.response.data);
                  throw new Error(error.response.data.message || "Login failed");
              } else if (error.request) {
                  // Request was made but no response was received
                  console.error("Login failed: No response from server");
                  throw new Error("Login failed: No response from server");
              } else {
                  // Something happened in setting up the request
                  console.error("Login failed:", error.message);
                  throw new Error("Login failed: " + error.message);
              }
          } else {
              // Generic error
              console.error("Login failed:", error);
              throw new Error("Login failed: " + error);
          }
      }
  },
};