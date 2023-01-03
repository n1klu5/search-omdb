import { screen, render, waitFor } from '@testing-library/react';
import { Search } from './Search';
import userEvent from '@testing-library/user-event';
import { FullWrapper } from '../../../testUtils/wrapperComponents';

describe('<Search/>', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('triggers searching after user input', async () => {
    fixtures.givenComponentIsRendered();
    await fixtures.whenUserTypesSearchTitle();
    await fixtures.thenOnSearchHandlerIsCalled();
  });
});

const getFixtures = () => {
  const onSearch = jest.fn();

  return {
    givenComponentIsRendered: () =>
      render(
        <Search searchTitle={'ada'} searchYear={''} onSearch={onSearch} />,
        { wrapper: FullWrapper },
      ),
    whenUserTypesSearchTitle: async () => {
      const searchInput = await screen.findByRole('input', {
        name: /Search By title/i,
      });
      await userEvent.type(searchInput, 'B');
    },
    thenOnSearchHandlerIsCalled: async () => {
      await waitFor(() => expect(onSearch).toBeCalledTimes(1));
      expect(onSearch).toBeCalledWith({ title: 'B', year: '' });
    },
  };
};
