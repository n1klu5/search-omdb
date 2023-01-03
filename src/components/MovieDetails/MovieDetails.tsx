import { clsx } from 'clsx';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { ResolutionContext } from 'shared/resolutionContext';
import { BUTTON_STYLE } from 'shared/styles';
import { Error } from '../shared/Error';
import { Loading } from '../shared/Loading';
import { useMovie } from './hooks/useMovie';

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isLoading, movie, error } = useMovie(id!);
  const { t } = useTranslation();
  const useSmallResolution = useContext(ResolutionContext);

  if (!id) {
    navigate('/');
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col rounded bg-gray-100 p-4">
      <div className="mb-2 flex items-center">
        <button
          type="button"
          className={clsx(BUTTON_STYLE, 'mr-4')}
          onClick={() => navigate('/')}
        >
          {t('main:back')}
        </button>
        <h1 className="text-2xl">{t('movies:details')}</h1>
      </div>
      {isLoading && <Loading />}
      {error && <Error errorMessage={error} />}
      {!isLoading && !error && movie && (
        <div
          className={clsx('flex justify-between p-4', {
            'flex-col': useSmallResolution.useSmallSizes,
          })}
        >
          <ul
            className={clsx({
              'mb-4': useSmallResolution.useSmallSizes,
            })}
          >
            <li>{t('movie:title', { title: movie.title })}</li>
            <li>{t('movie:year', { year: movie.year })}</li>
            <li>{t('movie:type', { type: movie.type })}</li>
            <li>{t('movie:actors', { actors: movie.actors })}</li>
            <li>
              {t('movie:ratings', {
                ratings: movie.ratings.map((rating) => rating.value).join(', '),
              })}
            </li>
            <li>{t('movie:plot', { plot: movie.plot })}</li>
          </ul>
          <img src={movie.poster} alt={movie.title} />
        </div>
      )}
    </div>
  );
};
