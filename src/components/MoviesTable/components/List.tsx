import { Movie } from 'entities/movie';
import { useTranslation } from 'react-i18next';
import { ListItem } from './ListItem';

interface Props {
  movies: Movie[];
}

export const List = ({ movies }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-2 flex rounded bg-gray-300 p-2">
        <h4 className="text-lg">{t('movies:movies')}</h4>
      </div>
      <ul className="flex flex-col">
        {movies.length ? (
          movies.map((movie) => <ListItem key={movie.imdbID} movie={movie} />)
        ) : (
          <li>
            <h4 className="my-4 flex flex-col items-center justify-center text-lg">
              <em className="mr-1">{t('movies:no-results')}</em>
              <em>{t('movies:narrow-filters')}</em>
            </h4>
          </li>
        )}
      </ul>
    </>
  );
};
