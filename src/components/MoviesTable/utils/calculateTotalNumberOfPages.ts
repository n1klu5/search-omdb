export const calculateTotalNumberOfPages = (
  totalCount: number,
  ROWS_PER_PAGE: number,
) => {
  if (!ROWS_PER_PAGE) return 0;
  return Math.ceil(totalCount / ROWS_PER_PAGE);
};
