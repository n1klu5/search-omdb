import { MovieType } from '../../api/contracts/movie';
import { MoviesResponse } from '../../api/contracts/movieResponse';

export class MovieBuilder {
  Poster = '';
  Title = 'Ada Apa dengan Cinta?';
  Type: MovieType = MovieType.Movie;
  Year = '2002';
  imdbID = 'tt0307920';
  Ratings = [{ Source: 'New York Times', Value: '7.5/10' }];

  withPoster(poster: string) {
    this.Poster = poster;
    return this;
  }

  withTitle(title: string) {
    this.Title = title;
    return this;
  }

  withType(type: MovieType) {
    this.Type = type;
    return this;
  }

  withYear(year: string) {
    this.Year = year;
    return this;
  }

  withImdbID(imdbID: string) {
    this.imdbID = imdbID;
    return this;
  }

  withRatings(imdbID: string) {
    this.imdbID = imdbID;
    return this;
  }

  build() {
    return {
      Poster: this.Poster,
      Title: this.Title,
      Type: this.Type,
      Year: this.Year,
      imdbID: this.imdbID,
      Ratings: this.Ratings,
    };
  }
}

export const MOVIES = [
  new MovieBuilder()
    .withTitle('Batman')
    .withType(MovieType.Movie)
    .withYear('1990')
    .withImdbID('tt908764')
    .build(),
  new MovieBuilder()
    .withTitle('Batman forever')
    .withType(MovieType.Movie)
    .withYear('1968')
    .withImdbID('tt908765')
    .build(),
  new MovieBuilder()
    .withTitle('Batman (re-mastered)')
    .withType(MovieType.Movie)
    .withYear('2012')
    .withImdbID('tt908766')
    .build(),
];

export const response: MoviesResponse = {
  Response: 'True',
  Search: MOVIES,
  totalResults: 3,
};
