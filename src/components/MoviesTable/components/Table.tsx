import { Movie } from 'entities/movie';
import { useTranslation } from 'react-i18next';
import { Row } from './Row';

interface Props {
  movies: Movie[];
}

export const Table = ({ movies }: Props) => {
  const { t } = useTranslation();

  return (
    <table className="w-full border border-gray-200">
      <thead className="border border-gray-200 bg-gray-300">
        <tr>
          <th className="sticky text-left"></th>
          <th className="sticky text-left">{t('movies:movie-title')}</th>
          <th className="sticky text-left">{t('movies:type')}</th>
          <th className="sticky text-left">{t('movies:year')}</th>
        </tr>
      </thead>
      <tbody>
        {movies.length ? (
          movies.map((movie) => <Row key={movie.imdbID} movie={movie} />)
        ) : (
          <tr>
            <td colSpan={4}>
              <h4 className="my-4 flex flex-col items-center justify-center text-lg">
                <em className="mr-1">{t('movies:no-results')}</em>
                <em>{t('movies:narrow-filters')}</em>
              </h4>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
