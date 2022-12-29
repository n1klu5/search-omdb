import { API_KEY, API_URL } from './constants';
import { MovieDetailsRaw } from './contracts/movieDetails';
import {
  MoviesBaseResponse,
  MoviesError,
  MoviesResponse,
} from './contracts/movieResponse';

export interface SearchParams {
  title: string;
  year: string;
}

export interface QueryParams {
  search?: SearchParams;
  pageNumber: number;
}

export const loadMovies = async (
  queryParams: QueryParams,
): Promise<MoviesResponse> => {
  const queryString = [
    queryParams.search?.title ? `s=${queryParams.search?.title}` : undefined,
    queryParams.search?.year ? `y=${queryParams.search?.year}` : undefined,
    `page=${queryParams.pageNumber}`,
  ]
    .filter(Boolean)
    .join('&');
  const response = await fetch(`${API_URL}?apikey=${API_KEY}&${queryString}`);

  const responseObject: MoviesBaseResponse = await response.json();
  if (responseObject.Response === 'True') {
    return responseObject as MoviesResponse;
  } else {
    throw new Error((responseObject as MoviesError).Error);
  }
};

export const loadMovie = async (id: string): Promise<MovieDetailsRaw> => {
  const response = await fetch(`${API_URL}?apikey=${API_KEY}&${`i=${id}`}`);

  const responseObject: MovieDetailsRaw = await response.json();
  return responseObject;
};
