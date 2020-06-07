import { indexTemplate, IProps } from './templates';

describe('indexTemplate tests', () => {
  it('should render the correct html output', (): void => {
    const defaultProps: IProps = {
      apiUrl: 'https://test.ie',
      canonicalUrl: 'https://test.ie',
      enableServiceWorker: false,
      helmet: {
        title: {
          toString: (): string => '<title>Test Title</title>'
        },
        meta: {
          toString: (): string => '<meta content="Test content" name="test" />'
        }
      } as any,
      packageVersion: '1.0.0',
      preloadedState: '{ "state": "test" }',
      reactAppHtml: '<div id="root"><p>Test content</p></div>',
      styleTags: '<style type="text/css"></style>',
    };
    const result = indexTemplate(defaultProps);

    expect(result).toContain('<title>Test Title</title>');
    expect(result).toContain('<meta content="Test content" name="test" />');
    expect(result).toContain('<style type="text/css"></style>');
    expect(result).toContain(`window.API_URL = 'https://test.ie';`);
    expect(result).toContain(`window.CANONICAL_URL = 'https://test.ie';`);
    expect(result).toContain(`window.VERSION = '1.0.0';`);

    expect(result).toContain(`<div id="root"><p>Test content</p></div>`);
    expect(result).toContain(`const enableServiceWorker = false`);
    expect(result).toContain(`window._PRELOADED_STATE_ = { "state": "test" };`);
  });
});
