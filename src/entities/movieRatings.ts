import { MovieRatingsRaw } from 'api/contracts/movieDetails';

export class MovieRatings {
  source: string;
  value: string;

  constructor(raw: MovieRatingsRaw) {
    this.source = raw.Source;
    this.value = raw.Value;
  }
}
