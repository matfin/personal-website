import { indexTemplate, Props, unsupported } from './templates';

describe('indexTemplate tests', (): void => {
  const defaultProps: Props = {
    canonicalUrl: 'https://test.ie',
    enableServiceWorker: false,
    helmet: {
      title: {
        toString: (): string => '<title>Test Title</title>',
      },
      meta: {
        toString: (): string => '<meta content="Test content" name="test" />',
      },
    } as any,
    packageVersion: '1.0.0',
    preloadedState: '{ "state": "test" }',
    reactAppHtml: '<div id="root"><p>Test content</p></div>',
    styleTags: '<style type="text/css"></style>',
  };

  it('should render the correct html output', (): void => {
    const result = indexTemplate(defaultProps);

    expect(result).toContain('<title>Test Title</title>');
    expect(result).toContain('<meta content="Test content" name="test" />');
    expect(result).toContain('<style type="text/css"></style>');
    expect(result).toContain("window.CANONICAL_URL = 'https://test.ie';");
    expect(result).toContain("window.VERSION = '1.0.0';");

    expect(result).toContain('<div id="root"><p>Test content</p></div>');
    expect(result).toContain('const enableServiceWorker = false');
    expect(result).toContain('window._PRELOADED_STATE_ = { "state": "test" };');
  });

  it('should enable the service worker', (): void => {
    const result = indexTemplate({
      ...defaultProps,
      enableServiceWorker: true,
    });

    expect(result).toContain('const enableServiceWorker = true');
  });

  it('should render content for unsupported browsers', (): void => {
    expect(unsupported()).toBeTruthy();
  });
});
