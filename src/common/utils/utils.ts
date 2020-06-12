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
  'December',
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

export const isExternalUrl = (url: string): boolean => {
  const regexp: RegExp = /(https?:\/\/|mailto:)/;

  return regexp.test(url);
};

export const toLinkObject = (linkText: string): ILink => {
  const regexp: RegExp = /\[(.*?)\]\((.*?)("(.*?)")?\)/gm;
  const result: any = regexp.exec(linkText);

  if (!result) {
    return {
      text: 'malformed link',
      title: 'malformed link',
      url: '/',
    };
  }

  const [, text, url, , title] = result;

  return {
    text,
    title,
    url: url.trim(),
  };
};

export const splitContent = (text: string): string[] => {
  const regexp: RegExp = /(\[.*?\]\(.*?\))/gm;

  return text.split(regexp);
};

export const isServer = (): boolean => typeof window === 'undefined';

export const isTouchDevice = (): boolean => (
  typeof window !== 'undefined' && 'ontouchstart' in window
);
