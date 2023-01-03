import { configureStore } from '@reduxjs/toolkit';
import { reducer as moviesReducer } from './components/MoviesTable/slice';

export const store = configureStore({
  reducer: {
    moviesSlice: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
