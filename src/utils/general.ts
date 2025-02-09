import type { Link, PathNesting } from '@models/interfaces';

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
  let revised: string = pathname;

  if (pathname.startsWith('/')) {
    revised = revised.substring(1);
  }
  if (revised.endsWith('/')) {
    revised = revised.substring(0, revised.length - 1);
  }

  return revised;
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

export const pathRoot = (pathname: string): string => {
  const splitPathname: string[] = pathname
    .split('/')
    .filter((str: string) => str.length > 0);

  return splitPathname[0] ?? 'index';
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
  typeof window !== 'undefined' && Boolean(window.ontouchstart);
