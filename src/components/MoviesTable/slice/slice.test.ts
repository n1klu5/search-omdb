import { SearchParams } from 'api/movies';
import { store } from 'store';
import { actions } from './index';

describe('moviesSlice', () => {
  let fixtures: ReturnType<typeof getFixtures>;

  beforeEach(() => {
    fixtures = getFixtures();
  });

  afterEach(() => {
    store.dispatch(actions.reset());
  });

  it('setSearchTitle updates searchTitle value', () => {
    fixtures.whenDispatchSetSearchParams({ title: 'adam', year: '' });
    fixtures.thenSliceStateContainsNewTitle('adam');
    fixtures.whenDispatchSetSearchParams({ title: 'damian', year: '1978' });
    fixtures.thenSliceStateContainsNewTitle('damian');
    fixtures.thenSliceStateContainsNewYear('1978');
  });

  it('changePage updates currentPageNumber value', () => {
    fixtures.whenDispatchChangePage();
    fixtures.thenSliceStateContainsNewPageNumber();
  });
});

const getFixtures = () => {
  return {
    whenDispatchSetSearchParams: (searchParams: SearchParams) =>
      store.dispatch(
        actions.setSearchParams({
          searchParams,
        }),
      ),
    whenDispatchChangePage: () =>
      store.dispatch(actions.changePage({ newPageNumber: 3 })),
    thenSliceStateContainsNewTitle: (title: string) => {
      expect(store.getState().moviesSlice.searchParams.title).toBe(title);
    },
    thenSliceStateContainsNewYear: (year: string) => {
      expect(store.getState().moviesSlice.searchParams.year).toBe(year);
    },
    thenSliceStateContainsNewPageNumber: () => {
      expect(store.getState().moviesSlice.currentPageNumber).toBe(3);
    },
  };
};
