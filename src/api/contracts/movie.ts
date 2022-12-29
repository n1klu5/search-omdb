export enum MovieType {
  Movie = 'movie',
  Series = 'series',
  Episode = 'episodes',
}

export interface MovieRaw {
  Poster: string;
  Title: string;
  Type: MovieType;
  Year: string;
  imdbID: string;
}
