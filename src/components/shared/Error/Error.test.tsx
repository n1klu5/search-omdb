import { screen, render } from '@testing-library/react';
import { IntlWrapper } from 'testUtils/wrapperComponents';
import { Error } from './Error';

describe('<Error/>', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('displays error', () => {
    fixtures.givenComponentIsRenderedWithMessage();
    fixtures.thenErrorMessageIsDisplayed();
  });

  it('displays even with empty message', () => {
    fixtures.givenComponentIsRendered();
    fixtures.thenErrorComtainerIsDisplayed();
  });
});

const getFixtures = () => {
  const renderComponent = (errorMessage: string) =>
    render(<Error errorMessage={errorMessage} />, { wrapper: IntlWrapper });

  return {
    givenComponentIsRendered: () => renderComponent(''),
    givenComponentIsRenderedWithMessage: () =>
      renderComponent('Internal Server error'),
    thenErrorMessageIsDisplayed: () => {
      const error = screen.getByRole('heading', {
        name: /Internal Server error/i,
      });
      expect(error).toBeVisible();
    },
    thenErrorComtainerIsDisplayed: () => {
      const error = screen.getByRole('heading');
      expect(error).toBeVisible();
    },
  };
};
