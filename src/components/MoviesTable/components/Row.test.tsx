import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '@testing-library/react';
import { Row } from './Row';
import { MOVIES } from 'testUtils/dataBuilders/movieBuilder';
import { FullWrapper } from 'testUtils/wrapperComponents';
import { Movie } from '../../../entities/movie';

describe('<Row/>', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('displays row with data', () => {
    fixtures.givenComponentIsRendered();
    fixtures.thenMoveRowIsDisplayed();
  });

  it('onClick navigates to detailsPage', async () => {
    fixtures.givenComponentIsRendered();
    await fixtures.whenUserClickOnRow();
    await fixtures.thenUserIsRedirectToDetailsPage();
  });
});

const getFixtures = () => {
  return {
    givenComponentIsRendered: () =>
      render(
        <table>
          <tbody>
            <Row movie={new Movie(MOVIES[0])} />
          </tbody>
        </table>,
        { wrapper: FullWrapper },
      ),
    whenUserClickOnRow: async () => {
      await userEvent.click(screen.getByText(MOVIES[0].Title));
    },
    thenMoveRowIsDisplayed: async () => {
      expect(screen.getByText(MOVIES[0].Title)).toBeVisible();
    },
    thenUserIsRedirectToDetailsPage: async () => {
      await waitFor(() =>
        expect(window.location.pathname).toBe(`/movie/${MOVIES[0].imdbID}`),
      );
    },
  };
};
