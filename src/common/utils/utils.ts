const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const formatDate = (date: Date): string => {
  const month = date.getMonth();
  const fullYear = date.getFullYear();

  return `${months[month]} ${fullYear}`;
};

export const setBodyOverflow = (overflow: boolean): void => {
  document.body.style.overflow = overflow ? 'auto' : 'hidden';
};