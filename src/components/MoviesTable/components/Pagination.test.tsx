import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { FullWrapper } from '../../../testUtils/wrapperComponents';

describe('<Pagination/>', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  it('change page on user button click', async () => {
    fixtures.givenComponentIsRendered();
    await fixtures.whenUserClickNextButton();
    fixtures.thenOnChangeHandlerIsCalled();
  });

  it('change page on user input', async () => {
    fixtures.givenComponentIsRendered();
    await fixtures.whenUserTypesInPageNumber();
    fixtures.thenOnChangeHandlerIsCalled();
  });
});

const getFixtures = () => {
  const onChange = jest.fn();
  const props = {
    totalCount: 30,
    currentPageNumber: 1,
    totalNumberOfPages: 3,
  };

  return {
    givenComponentIsRendered: () =>
      render(<Pagination {...props} onChange={onChange} />, {
        wrapper: FullWrapper,
      }),
    whenUserClickNextButton: async () => {
      await userEvent.click(screen.getByRole('button', { name: /Next/i }));
    },
    whenUserTypesInPageNumber: async () => {
      await userEvent.type(screen.getByRole('input'), '{selectall}2');
    },
    thenOnChangeHandlerIsCalled: async () => {
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(2);
    },
  };
};
