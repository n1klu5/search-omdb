import { screen, render } from '@testing-library/react';
import { Movie } from '../../../entities/movie';
import { MOVIES } from 'testUtils/dataBuilders/movieBuilder';
import { FullWrapper } from 'testUtils/wrapperComponents';
import { Table } from './Table';

describe('<Table />', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('displays data', () => {
    fixtures.givenComponentIsRendered();
    fixtures.thenTableWithDataIsDisplayed();
  });

  it('displays empty message if no data', () => {
    fixtures.givenComponentIsRenderedWithEmptyData();
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeTruthy();
    expect(tableElement).toBeTruthy();
  });
});

const getFixtures = () => {
  const renderComponent = (data: Movie[]) =>
    render(<Table movies={data} />, {
      wrapper: FullWrapper,
    });

  return {
    givenComponentIsRendered: () =>
      renderComponent(MOVIES.map((movie) => new Movie(movie))),
    givenComponentIsRenderedWithEmptyData: () => renderComponent([]),
    thenTableWithDataIsDisplayed: () => {
      expect(screen.getByRole('table')).toBeVisible();
      expect(screen.getByText(MOVIES[0].Title)).toBeVisible();
    },
  };
};
