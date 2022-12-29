import { calculateTotalNumberOfPages } from './calculateTotalNumberOfPages';

describe('calculateTotalNumberOfPages', () => {
  test.each([
    [5, 3, 2],
    [0, 3, 0],
    [5, 0, 0],
  ])(
    'given rows and ROWS_PER_PAGE - %p as arguments, returns %p',
    (rowsArg, ROWS_PER_PAGE, expectedResult) => {
      const total = calculateTotalNumberOfPages(rowsArg, ROWS_PER_PAGE);
      expect(total).toEqual(expectedResult);
    },
  );
});
