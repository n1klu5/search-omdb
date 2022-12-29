import { MovieType } from 'api/contracts/movie';
import { MovieDetailsRaw } from 'api/contracts/movieDetails';
import { MovieRatings } from './movieRatings';

export class MovieDetails {
  public actors: string;
  public awards: string;
  public boxOffice: string;
  public country: string;
  public dVD: string;
  public director: string;
  public genre: string;
  public language: string;
  public metascore: string;
  public plot: string;
  public poster: string;
  public production: string;
  public rated: string;
  public ratings: MovieRatings[];
  public released: string;
  public response: string;
  public runtime: string;
  public title: string;
  public type: MovieType;
  public website: string;
  public writer: string;
  public year: string;
  public imdbID: string;
  public imdbRating: string;
  public imdbVotes: string;

  constructor(raw: MovieDetailsRaw) {
    this.actors = raw.Actors;
    this.awards = raw.Awards;
    this.boxOffice = raw.BoxOffice;
    this.country = raw.Country;
    this.dVD = raw.DVD;
    this.director = raw.Director;
    this.genre = raw.Genre;
    this.language = raw.Language;
    this.metascore = raw.Metascore;
    this.plot = raw.Plot;
    this.poster = raw.Poster;
    this.production = raw.Production;
    this.rated = raw.Rated;
    this.ratings = (raw.Ratings || []).map(
      (rating) => new MovieRatings(rating),
    );
    this.released = raw.Released;
    this.response = raw.Response;
    this.runtime = raw.Runtime;
    this.title = raw.Title;
    this.type = raw.Type;
    this.website = raw.Website;
    this.writer = raw.Writer;
    this.year = raw.Year;
    this.imdbID = raw.imdbID;
    this.imdbRating = raw.imdbRating;
    this.imdbVotes = raw.imdbVotes;
  }
}
