import { screen, render } from '@testing-library/react';
import { FullWrapper } from 'testUtils/wrapperComponents';
import { NoRouteMatch } from './index';

describe('<NoRouteMatch/>', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('displays nothing to see message', () => {
    fixtures.givenComponentIsRendered();
    fixtures.thenMessageIsDisplayed();
  });
});

const getFixtures = () => {
  return {
    givenComponentIsRendered: () =>
      render(<NoRouteMatch />, { wrapper: FullWrapper }),
    thenMessageIsDisplayed: () => {
      const error = screen.getByRole('heading', {
        name: /Nothing to see here/i,
      });
      expect(error).toBeVisible();
    },
  };
};
