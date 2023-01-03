import { MoviesError, MoviesResponse } from 'api/contracts/movieResponse';
import { loadMovies, QueryParams } from 'api/movies';
import { Movie } from '../../../entities/movie';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

export const useMovies = (queryParams: QueryParams) => {
  const { data, isLoading, error } = useQuery<MoviesResponse, MoviesError>(
    [
      'movies',
      queryParams.pageNumber,
      queryParams.search?.title,
      queryParams.search?.year,
    ],
    () => loadMovies(queryParams),
    {
      enabled: !!queryParams.search?.title,
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const movies = useMemo(() => {
    return data ? data.Search.map((movie) => new Movie(movie)) : undefined;
  }, [data]);

  return {
    movies: movies ?? [],
    totalCount: data?.totalResults ?? 0,
    isLoading,
    error: error?.Error,
  };
};
