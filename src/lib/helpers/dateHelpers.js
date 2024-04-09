import {
  format,
  subDays,
  isValid,
  subMinutes,
  isToday,
  isYesterday,
  differenceInCalendarDays,
  isAfter
} from 'date-fns';

export const tableDateFilterOptions = [
  {
    id: format(subDays(new Date(), 7), 'dd-MM-yyyy'),
    text: 'Last 7 days'
  },
  {
    id: format(subDays(new Date(), 15), 'dd-MM-yyyy'),
    text: 'Last 15 days'
  },
  {
    id: format(subDays(new Date(), 30), 'dd-MM-yyyy'),
    text: 'Last month'
  },
  {
    id: format(subDays(new Date(), 90), 'dd-MM-yyyy'),
    text: 'Last 3 months'
  },
  {
    id: format(subDays(new Date(), 365), 'dd-MM-yyyy'),
    text: 'Last year'
  }
];

export const getDateStringOrWeekDay = (
  value,
  dateFormat = 'EEEE, MMMM do',
  options = {}
) => {
  let date = new Date(value);
  if (!isValid(date)) return '';

  if (options?.considerTimezone) {
    const utcOffset = new Date().getTimezoneOffset();
    date = subMinutes(new Date(value), parseInt(utcOffset));
  }
  const today = new Date();

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';

  const dayDifference = differenceInCalendarDays(today, date);
  if (dayDifference >= 2 && dayDifference <= 6) {
    return getWeekDay(date);
  }
  return formatDate(date, dateFormat);
};

export const getWeekDay = (date) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return formatDate(date, 'EEEE');
};

export const formatDate = (date, formatString = 'dd-MM-yyyy') => {
  if (!date) return '';
  date = new Date(date);
  if (!isValid(date)) return '';
  return format(date, formatString);
};

export const getLatestDate = (dateA, dateB) => {
  const dA = new Date(dateA);
  const dB = new Date(dateB);

  const isValidA = isValid(dA);
  const isValidB = isValid(dB);

  if (!isValidA && !isValidB) return '';
  else if (isValidA && !isValidB) return dateA;
  else if (!isValidA && isValidB) return dateB;
  else {
    if (isAfter(dA, dB)) return dateA;
    else return dateB;
  }
};
