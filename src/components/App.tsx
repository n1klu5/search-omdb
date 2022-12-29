// Libraries
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

// Components
import { NoRouteMatch } from './shared/NoRouteMatch';
import { Loading } from './shared/Loading';

const MoviesTable = lazy(() => import('./MoviesTable'));

export const App = () => {
  return (
    <div className="flex h-full w-full">
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <MoviesTable />
              </Suspense>
            }
          />
          <Route path="*" element={<NoRouteMatch />} />
        </Route>
      </Routes>
    </div>
  );
};
