import { Movie } from 'entities/movie';
import { useTranslation } from 'react-i18next';

interface Props {
  movie: Movie;
}

export const ListItem = ({ movie }: Props) => {
  const { t } = useTranslation();

  return (
    <li
      key={movie.imdbID}
      className="flex cursor-pointer border border-gray-200 odd:bg-gray-200 even:bg-white"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        width="50"
        height="50"
        className="mr-2"
      />
      <div className="flex flex-col">
        <span>{t('movie:title', { title: movie.title })}</span>
        <span>{t('movie:year', { year: movie.year })}</span>
      </div>
    </li>
  );
};
