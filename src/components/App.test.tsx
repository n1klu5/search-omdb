import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { FullWrapper } from 'testUtils/wrapperComponents';

import { App } from './App';

jest.mock('../api/movies', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const MovieBuilder = require('../testUtils/dataBuilders/movieBuilder');
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

describe('<App />', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('shows loader first, then renders the app', async () => {
    fixtures.givenComponentIsRendered();
    await fixtures.thenLoaderIsVisible();
    await fixtures.thenTitleIsVisible();
  });
});

const getFixtures = () => {
  return {
    givenComponentIsRendered: () => render(<App />, { wrapper: FullWrapper }),
    thenLoaderIsVisible: async () => {
      const loader = await screen.findByText('Loading, please wait ...');
      expect(loader).toBeVisible();
      await waitForElementToBeRemoved(loader);
    },
    thenTitleIsVisible: async () => {
      const title = await screen.findByRole('heading', {
        name: /OMDB Searcher/i,
      });
      expect(title).toBeVisible();
    },
  };
};
