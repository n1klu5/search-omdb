// Libraries
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Contracts
import { SearchParams } from 'api/movies';
import { INPUT_STYLE } from 'shared/styles';

interface Props {
  searchTitle: string;
  searchYear: string;
  onSearch: (params: SearchParams) => void;
}

export const SEARCH_TITLE_ID = 'searchTitle';
export const SEARCH_YEAR_ID = 'searchYear';

export const Search = ({ onSearch }: Props) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const onSearchTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setTitle(text);
    onSearch({ title: text, year });
  };
  const onSearchYear = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setYear(text);
    onSearch({ title, year: text });
  };

  return (
    <div className="mb-4 flex flex-col border-b border-gray-300 p-2">
      <div className="flex">
        <h4 className="text-lg">{t('movies:filters')}</h4>
      </div>
      <div className="flex">
        <div className="mr-4 flex w-full flex-col">
          <label className="text-sm" htmlFor={SEARCH_TITLE_ID}>
            {t('movies:search-by-title.label')}
          </label>
          <input
            id={SEARCH_TITLE_ID}
            value={title}
            type="search"
            role="input"
            className={INPUT_STYLE}
            placeholder={t('movies:search-by-title.placeholder') ?? undefined}
            onChange={onSearchTitle}
          />
        </div>
        <div className="flex w-full flex-col">
          <label className="text-sm" htmlFor={SEARCH_YEAR_ID}>
            {t('movies:search-by-year.label')}
          </label>
          <input
            id={SEARCH_YEAR_ID}
            value={year}
            disabled={!title}
            type="search"
            role="input"
            className={INPUT_STYLE}
            placeholder={t('movies:search-by-year.placeholder') ?? undefined}
            onChange={onSearchYear}
          />
        </div>
      </div>
    </div>
  );
};
