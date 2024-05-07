import { Link, PathNesting } from 'models';

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
  const regexp = /(\[.*?\]\(.*?\))/;

  return regexp.test(text || '');
};

export const isExternalUrl = (url: string): boolean => {
  const regexp = /(https?:\/\/|mailto:)/;

  return regexp.test(url);
};

export const normalisePathname = (pathname = ''): string => {
  if (pathname.startsWith('/') && pathname.endsWith('/')) {
    return pathname.substring(1, pathname.length - 1);
  }

  return pathname;
};

export const pathNesting = (pathname = ''): PathNesting => {
  const parts = pathname
    .split('/')
    .filter((part: string): boolean => part.length > 0);

  return {
    parts,
    isNested: parts.length > 1,
  };
};

export const toLinkObject = (linkText: string): Link => {
  const regexp = /\[(.*?)\]\((.*?)("(.*?)")?\)/gm;
  const result: RegExpExecArray | null = regexp.exec(linkText);

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
  const regexp = /(\[.*?\]\(.*?\))/gm;

  return text.split(regexp);
};

export const isTouchDevice = (): boolean =>
  typeof window !== 'undefined' && 'ontouchstart' in window;

export const isIE = (ua?: string): boolean => {
  const regexp = /(Trident|MSIE)/gm;

  return regexp.test(ua || '');
};
