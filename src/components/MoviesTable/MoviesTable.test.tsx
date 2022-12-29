import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { FullWrapper } from 'testUtils/wrapperComponents';
import userEvent from '@testing-library/user-event';
import MoviesTable from './index';

jest.mock('../../api/movies', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const MovieBuilder = require('../../testUtils/dataBuilders/movieBuilder');
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
          500,
        ),
      ),
  };
});

describe('<MoviesTable/>', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('can search by title', async () => {
    fixtures.givenComponentIsRendered();
    await fixtures.whenUserEntersSearchTitle();
    await fixtures.thenLoaderIsVisible();
    await fixtures.thenTableWithMoviesIsDisplayed();
  });
});

const getFixtures = () => {
  return {
    givenComponentIsRendered: () =>
      render(<MoviesTable />, { wrapper: FullWrapper }),
    whenUserEntersSearchTitle: async () => {
      const searchInput = await screen.findByRole('input', {
        name: /Search By title/i,
      });
      await userEvent.type(searchInput, 'Batman');
    },
    thenLoaderIsVisible: async () => {
      const loader = await screen.findByText('Loading, please wait ...');
      expect(loader).toBeVisible();
      await waitForElementToBeRemoved(loader);
    },
    thenTableWithMoviesIsDisplayed: async () => {
      expect(await screen.findByRole('table')).toBeVisible();
      expect(await screen.findByText('Batman')).toBeVisible();
    },
  };
};
