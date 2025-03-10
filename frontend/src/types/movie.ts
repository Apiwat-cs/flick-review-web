export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;  
  vote_average: number;
  genres: { id: number; name: string }[];
}

