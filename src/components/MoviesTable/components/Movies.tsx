import { useContext } from 'react';

import { Movie } from 'entities/movie';

import { ResolutionContext } from 'shared/resolutionContext';

import { List } from './List';
import { Table } from './Table';

interface Props {
  movies: Movie[];
}

export const Movies = ({ movies }: Props) => {
  const useSmallResolution = useContext(ResolutionContext);

  return (
    <div className="mb-4 flex h-[calc(100vh-260px)] w-full flex-col overflow-auto">
      {useSmallResolution.useSmallSizes ? (
        <List movies={movies} />
      ) : (
        <Table movies={movies} />
      )}
    </div>
  );
};
