// Hooks
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useMovies } from './hooks/useMovies';

// Components
import { Error } from 'components/shared/Error';
import { Loading } from 'components/shared/Loading';
import { Pagination } from './components/Pagination';
import { Search } from './components/Search';
import { Movies } from './components/Movies';

// Redux
import { selectors, actions, ROWS_PER_PAGE } from './slice';

// Libraries
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { SearchParams } from 'api/movies';
import { calculateTotalNumberOfPages } from './utils/calculateTotalNumberOfPages';

export const MoviesTable = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { searchTitle, searchYear, currentPageNumber } = useAppSelector(
    (state) => ({
      searchTitle: selectors.searchTitleSelector(state),
      searchYear: selectors.searchYearSelector(state),
      currentPageNumber: selectors.currentPageNumberSelector(state),
    }),
  );

  const { movies, isLoading, error, totalCount } = useMovies({
    search: { title: searchTitle, year: searchYear },
    pageNumber: currentPageNumber ?? 1,
  });

  const onSearch = debounce((searchParams: SearchParams) => {
    dispatch(actions.setSearchParams({ searchParams }));
  }, 500);

  const onChangePage = (newPageNumber: number | undefined) => {
    dispatch(actions.changePage({ newPageNumber }));
  };

  return (
    <>
      <div className="flex h-full w-full flex-col rounded bg-gray-100 p-4">
        <div className="mb-2 flex">
          <h1 className="text-2xl">{t('movies:title')}</h1>
        </div>
        <Search
          searchTitle={searchTitle}
          searchYear={searchYear}
          onSearch={onSearch}
        />
        {error ? <Error errorMessage={error} /> : null}
        {isLoading ? <Loading /> : null}
        {!isLoading && !error ? (
          <>
            <Movies movies={movies} />
            <Pagination
              totalCount={totalCount}
              totalNumberOfPages={calculateTotalNumberOfPages(
                totalCount,
                ROWS_PER_PAGE,
              )}
              currentPageNumber={currentPageNumber}
              onChange={onChangePage}
            />
          </>
        ) : null}
      </div>
    </>
  );
};
