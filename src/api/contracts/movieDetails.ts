import { MovieType } from './movie';

export interface MovieDetailsRaw {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: MovieRatingsRaw[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: MovieType;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface MovieRatingsRaw {
  Source: string;
  Value: string;
}
