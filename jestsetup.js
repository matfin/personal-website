// window objects
window.scrollTo = jest.fn();
window.apiUrl = '';
window.appName = '';
window.appVersion = '';
window.cacheName = '';
window.canonicalUrl = '';
window.enableCache = false;
window.isProduction = false;
window.port = '';
window.fetch = jest.fn();
window.crypto.randomUUID = () => 'abcd-1234';
