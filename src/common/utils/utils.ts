import { ILink } from 'common/interfaces';
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

export const isLink = (text?: string): boolean => {
  const regexp: RegExp = /(\[.*?\]\(.*?\))/;

  return regexp.test(text || '');
};

export const toLinkObject = (linkText: string): ILink => {
  const regexp: RegExp = /\[(?<text>.*?)\]\((?<url>.*?)("(?<title>.*?)")?\)/gm;
  const result: any = regexp.exec(linkText);

  if (!result) {
    return {
      text: 'malformed link',
      title: 'malformed link',
      url: '/',
    };
  }

  return {
    text: result?.groups?.text,
    ...(result.groups.title && { title: result.groups.title }),
    url: result?.groups?.url.trim(),
  };
}

export const splitContent = (text: string): string[] => {
  const regexp: RegExp = /(\[.*?\]\(.*?\))/gm;

  return text.split(regexp);
};
