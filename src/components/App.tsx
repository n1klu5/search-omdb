// Libraries
import { debounce } from 'lodash';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

// Components
import { NoRouteMatch } from './shared/NoRouteMatch';
import { Loading } from './shared/Loading';

// Utilities
import { isSmallResolution, ResolutionContext } from 'shared/resolutionContext';

const MovieDetails = lazy(() => import('./MovieDetails'));
const MoviesTable = lazy(() => import('./MoviesTable'));

export const App = () => {
  const [usedResolution, setUsedResolution] = useState({
    useSmallSizes: isSmallResolution(),
  });

  const windowResize = debounce(() => {
    setUsedResolution({ useSmallSizes: isSmallResolution() });
  }, 500);

  useEffect(() => {
    window.addEventListener('resize', windowResize);

    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

  return (
    <ResolutionContext.Provider value={usedResolution}>
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
            <Route
              path="movie/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <MovieDetails />
                </Suspense>
              }
            />
            <Route path="*" element={<NoRouteMatch />} />
          </Route>
        </Routes>
      </div>
    </ResolutionContext.Provider>
  );
};
