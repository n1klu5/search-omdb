import { clsx } from 'clsx';
import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { BUTTON_STYLE, INPUT_STYLE } from 'shared/styles';

import { ROWS_PER_PAGE } from '../slice';

interface Props {
  totalCount: number;
  currentPageNumber: number | undefined;
  totalNumberOfPages: number;
  onChange: (newPageNumber: number | undefined) => void;
}

export const Pagination = ({
  totalCount,
  currentPageNumber,
  totalNumberOfPages,
  onChange,
}: Props) => {
  const { t } = useTranslation();

  const previousPageDisabled = currentPageNumber === 0;
  const nextPageDisabled = currentPageNumber === totalNumberOfPages;

  const previousPage = () => {
    const newPage = Math.max(0, (currentPageNumber ?? 0) - 1);
    onChange(newPage);
  };

  const nextPage = () => {
    const newPage = Math.min(totalNumberOfPages, (currentPageNumber ?? 0) + 1);
    onChange(newPage);
  };

  const onChangePage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const receivedPageNumber = parseInt(value, 10) - 1;
    const newPageNumber = Math.min(
      Math.max(0, receivedPageNumber),
      totalNumberOfPages - 1,
    );
    onChange(isNaN(newPageNumber) ? undefined : newPageNumber);
  };

  return (
    <div className="flex items-center justify-end">
      <span className="mr-2">
        {t('movies:items-per-page', {
          totalCount,
          itemsPerPage: ROWS_PER_PAGE,
        })}
      </span>
      <div>
        <button
          className={clsx('mr-2', BUTTON_STYLE)}
          onClick={previousPage}
          disabled={previousPageDisabled}
        >
          {t('movies:previous')}
        </button>
        <input
          className={clsx('mr-2', INPUT_STYLE)}
          type="number"
          role="input"
          min="1"
          max={totalNumberOfPages}
          value={currentPageNumber}
          onChange={onChangePage}
        />
        <span className="mr-1">{`of ${totalNumberOfPages}`}</span>
        <button
          className={BUTTON_STYLE}
          onClick={nextPage}
          disabled={nextPageDisabled}
        >
          {t('movies:next')}
        </button>
      </div>
    </div>
  );
};
