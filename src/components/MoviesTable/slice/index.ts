// Library
import {
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

// entities
import { Movie } from 'entities/movie';

// Contracts
import { SearchParams } from 'api/movies';
import { RootState } from 'store';

export const ROWS_PER_PAGE = 10;

export interface MoviesState {
  searchParams: SearchParams;
  currentPageNumber: number | undefined;
}

const initialState: MoviesState = {
  searchParams: {
    title: '',
    year: '',
  },
  currentPageNumber: 1,
};

const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    setSearchParams: (
      state: MoviesState,
      { payload: { searchParams } }: PayloadAction<SetSearchParams>,
    ) => {
      state.currentPageNumber = 1;
      state.searchParams = searchParams;
    },
    changePage: (
      state: MoviesState,
      { payload: { newPageNumber } }: PayloadAction<ChangePage>,
    ) => {
      state.currentPageNumber = newPageNumber;
    },
    reset: () => initialState,
  },
});

const selectSelf = (state: RootState) => state.moviesSlice;
const searchTitleSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.searchParams.title ?? '',
);
const searchYearSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.searchParams.year ?? '',
);
const currentPageNumberSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.currentPageNumber,
);

export const { name, actions, reducer } = moviesSlice;

export interface SetSearchParams {
  searchParams: SearchParams;
}

export interface SetError {
  error: string | undefined;
}

export interface MoviesLoaded {
  movies: Movie[];
  totalCount: number;
  error: string;
}

export interface ChangePage {
  newPageNumber: number | undefined;
}

export const selectors = {
  searchTitleSelector,
  searchYearSelector,
  currentPageNumberSelector,
};
