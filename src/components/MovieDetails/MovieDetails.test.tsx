import userEvent from '@testing-library/user-event';
import {
  screen,
  render,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import MovieDetails from './index';
import { FullWrapper } from 'testUtils/wrapperComponents';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({
    id: 'tt0190876',
  }),
}));

jest.mock('../../api/movies', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const MovieBuilder = require('../../testUtils/dataBuilders/movieBuilder');
  return {
    loadMovie: () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(MovieBuilder.MOVIES[0]), 1000),
      ),
  };
});

describe('<MovieDetails />', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('show loading on start and displays movie details after data loaded', async () => {
    fixtures.givenComponentIsRendered();
    await fixtures.thenLoaderIsVisible();
    await fixtures.thenDetailsAreVisible();
  });

  it('navigate to main page after user clicks on back button', async () => {
    fixtures.givenComponentIsRendered();
    await fixtures.whenUserClickBackButton();
    fixtures.thenRouteIsChanged();
  });
});

const getFixtures = () => {
  return {
    givenComponentIsRendered: () =>
      render(<MovieDetails />, { wrapper: FullWrapper }),
    whenUserClickBackButton: async () => {
      await userEvent.click(screen.getByRole('button', { name: /Back/i }));
    },
    thenLoaderIsVisible: async () => {
      const loader = await screen.findByText('Loading, please wait ...');
      expect(loader).toBeVisible();
      await waitForElementToBeRemoved(loader);
    },
    thenDetailsAreVisible: async () => {
      expect(await screen.findByText('Title: Batman')).toBeVisible();
    },
    thenRouteIsChanged: async () => {
      expect(window.location.pathname).toBe('/');
    },
  };
};
