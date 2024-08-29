import { DateRange } from '../interfaces/date-range.interface';

export const getDateMonthRangeUtil = (date: Date): DateRange => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const dateRangeStart = new Date(year, month, 1);
  const dateRangeEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);

  return {
    start: dateRangeStart,
    end: dateRangeEnd,
  };
};
