import { MovieDetailsRaw } from 'api/contracts/movieDetails';
import { MoviesError } from 'api/contracts/movieResponse';
import { loadMovie } from 'api/movies';
import { MovieDetails } from '../../../entities/movieDetails';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

export const useMovie = (id: string) => {
  const { data, isLoading, error } = useQuery<MovieDetailsRaw, MoviesError>(
    ['movie', id],
    () => loadMovie(id),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  const movie = useMemo(() => {
    return data ? new MovieDetails(data) : undefined;
  }, [data]);

  return {
    movie,
    isLoading,
    error: error?.Error,
  };
};
