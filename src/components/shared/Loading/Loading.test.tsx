import { screen, render } from '@testing-library/react';
import { IntlWrapper } from 'testUtils/wrapperComponents';
import { Loading } from './Loading';

describe('<Loading />', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('displays loading message', () => {
    fixtures.givenComponentIsRendered();
    fixtures.thenLoadingMessageIsDisplayed();
  });
});

const getFixtures = () => {
  return {
    givenComponentIsRendered: () =>
      render(<Loading />, { wrapper: IntlWrapper }),
    thenLoadingMessageIsDisplayed: () => {
      expect(screen.getByText('Loading, please wait ...')).toBeVisible();
    },
  };
};
