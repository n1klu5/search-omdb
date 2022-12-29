import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BUTTON_STYLE } from 'shared/styles';

export const NoRouteMatch = () => {
  const { t } = useTranslation();

  return (
    <div className="m-4 flex h-full w-full flex-col">
      <div className="mb-4 flex h-full w-full items-center justify-center rounded bg-orange-200">
        <h2 className="text-xl">{t('main:nothing-to-see')}</h2>
      </div>
      <button className={BUTTON_STYLE}>
        <Link to="/">{t('main:go-home')}</Link>
      </button>
    </div>
  );
};
