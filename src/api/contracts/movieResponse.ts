import { MovieRaw } from './movie';

export interface MoviesBaseResponse {
  Response: 'True' | 'False';
}

export interface MoviesResponse extends MoviesBaseResponse {
  Search: MovieRaw[];
  totalResults: number;
}

export interface MoviesError extends MoviesBaseResponse {
  Error: string;
}
