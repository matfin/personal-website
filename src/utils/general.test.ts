import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  formatDate,
  setBodyOverflow,
  isExternalUrl,
  isLink,
  isTouchDevice,
  normalisePathname,
  pathNesting,
  toLinkObject,
  splitContent,
  pathRoot,
} from './general';

describe('general utils tests', (): void => {
  beforeEach((): void => {
    vi.restoreAllMocks();
  });

  it('should format a date', (): void => {
    expect(formatDate(new Date('1982-04-26'))).toEqual('April 1982');
  });

  it('should set the body overflow', (): void => {
    setBodyOverflow(true);
    expect(document.body.style.overflow).toEqual('auto');

    setBodyOverflow(false);
    expect(document.body.style.overflow).toEqual('hidden');
  });

  it('should check if a string is an MD formatted link', (): void => {
    expect(isLink('Nothing in here!')).toBe(false);
    expect(isLink()).toBe(false);
    expect(isLink('I like to code in Javascript (ES)')).toBe(false);
    expect(isLink('[page](https://www.test.dd)')).toBe(true);
  });

  it('checks to see if a string contains a markdown flavoured link', (): void => {
    expect(isLink('I am not a link!')).toBe(false);
    expect(
      isLink('I do indeed [have a link](/link "A link!") contained in me!'),
    ).toBe(true);
    expect(isLink('I am [a link](/a-link) with no title!')).toBe(true);
    expect(isLink('I am [a malformed] (/a-link) because of the space!')).toBe(
      false,
    );
  });

  it('checks to see if a url is external', (): void => {
    expect(isExternalUrl('https://www.test.de')).toBe(true);
    expect(isExternalUrl('http://www.test.de')).toBe(true);
    expect(isExternalUrl('/test-content')).toBe(false);
    expect(isExternalUrl('mailto:test@test.de')).toBe(true);
  });

  it('converts a markdown style link to a link object', (): void => {
    expect(toLinkObject('[test link with title](/test "Test")')).toEqual({
      text: 'test link with title',
      title: 'Test',
      url: '/test',
    });

    expect(toLinkObject('[test link without title](/test)')).toEqual({
      text: 'test link without title',
      url: '/test',
    });

    expect(toLinkObject('A normal line of text with no links')).toEqual({
      text: 'malformed link',
      title: 'malformed link',
      url: '/',
    });
  });

  it('splits out content if a markdown flavoured link is found', (): void => {
    expect(splitContent('I am a normal parahraph with no links')).toEqual([
      'I am a normal parahraph with no links',
    ]);

    expect(
      splitContent(
        'I have [a couple](/some-links "Links") of links and [another one](/another) right here!',
      ),
    ).toEqual([
      'I have ',
      '[a couple](/some-links "Links")',
      ' of links and ',
      '[another one](/another)',
      ' right here!',
    ]);
  });

  it('checks for touch devices', (): void => {
    delete global.window.ontouchstart;
    expect(isTouchDevice()).toBe(false);

    global.window.ontouchstart = vi.fn();
    expect(isTouchDevice()).toBe(true);
  });

  it('returns the correct path root', (): void => {
    expect(pathRoot('/')).toEqual('index');
    expect(pathRoot('/about/')).toEqual('about');
    expect(pathRoot('/projects/test-project/')).toEqual('projects');
  });

  it('returns the correct path nesting', (): void => {
    expect(pathNesting('/projects/test')).toEqual({
      isNested: true,
      parts: ['projects', 'test'],
    });

    expect(pathNesting('/projects')).toEqual({
      isNested: false,
      parts: ['projects'],
    });

    expect(pathNesting('')).toEqual({
      isNested: false,
      parts: [],
    });

    expect(pathNesting()).toEqual({
      isNested: false,
      parts: [],
    });
  });

  it('should return a normalised path name', (): void => {
    expect(normalisePathname()).toEqual('');
    expect(normalisePathname('/')).toEqual('');
    expect(normalisePathname('/test/another/')).toEqual('test/another');
    expect(normalisePathname('/about/')).toEqual('about');
  });
});
