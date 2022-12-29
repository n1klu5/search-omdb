import { MovieRaw, MovieType } from 'api/contracts/movie';

export class Movie {
  public poster: string;
  public title: string;
  public type: MovieType;
  public year: string;
  public imdbID: string;

  constructor(raw: MovieRaw) {
    this.poster = raw.Poster;
    this.title = raw.Title;
    this.type = raw.Type;
    this.year = raw.Year;
    this.imdbID = raw.imdbID;
  }
}
