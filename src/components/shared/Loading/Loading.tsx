import { useTranslation } from 'react-i18next';

export const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="m-4 flex h-full w-full items-center justify-center rounded bg-orange-200">
      <span className="uppercase text-sky-800">{t('main:loading')}</span>
    </div>
  );
};
