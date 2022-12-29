import { renderHook, RenderResult } from '@testing-library/react-hooks';

import { FullWrapper } from '../../../testUtils/wrapperComponents';
import { useMovies } from './useMovies';
import { MOVIES } from 'testUtils/dataBuilders/movieBuilder';
import { Movie } from '../../../entities/movie';
import { waitFor } from '@testing-library/react';

interface HookResult {
  movies: Movie[];
  totalCount: number;
  isLoading: boolean;
  error: string | undefined;
}

jest.mock('../../../api/movies', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const MovieBuilder = require('../../../testUtils/dataBuilders/movieBuilder');
  return {
    loadMovies: () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              Response: 'True',
              Search: MovieBuilder.MOVIES,
              totalResults: 3,
            }),
          1000,
        ),
      ),
  };
});

describe('useMovies', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('loads data for movies', async () => {
    const { result, waitForNextUpdate } = fixtures.givenHookIsRendered();
    fixtures.thenHookIsLoading(result);
    await fixtures.whenNextUpdate(waitForNextUpdate);
    await fixtures.thenHookIsNotLoadingAndHaveData(result);
  });
});

const getFixtures = () => {
  return {
    givenHookIsRendered: () =>
      renderHook(
        () => useMovies({ search: { title: 'Adam', year: '' }, pageNumber: 1 }),
        {
          wrapper: FullWrapper,
        },
      ),
    whenNextUpdate: async (waitForNextUpdate: () => Promise<void>) => {
      await waitForNextUpdate();
    },
    thenHookIsLoading: async (result: RenderResult<HookResult>) => {
      expect(result.current.isLoading).toBe(true);
    },
    thenHookIsNotLoadingAndHaveData: async (
      result: RenderResult<HookResult>,
    ) => {
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.movies[0]).toEqual(
        expect.objectContaining(new Movie(MOVIES[0])),
      );
    },
  };
};
