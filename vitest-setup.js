import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// window objects
window.scrollTo = vi.fn();
window.apiUrl = '';
window.appName = '';
window.appVersion = '';
window.cacheName = '';
window.canonicalUrl = '';
window.enableCache = false;
window.isProduction = false;
window.port = '';
window.fetch = vi.fn();
window.crypto.randomUUID = () => 'abcd-1234';
