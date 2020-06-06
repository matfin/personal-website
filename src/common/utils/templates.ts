import { HelmetData } from 'react-helmet';

export interface IProps {
  apiUrl: string,
  canonicalUrl: string,
  enableServiceWorker: boolean,
  helmet: HelmetData,
  packageVersion?: string,
  preloadedState: string,
  reactAppHtml: string,
  styleTags: string,
};

export const indexTemplate = ({
  apiUrl,
  canonicalUrl,
  enableServiceWorker,
  helmet,
  packageVersion,
  preloadedState,
  reactAppHtml,
  styleTags,
}: IProps): string => `
  <!DOCTYPE html>
  <html lang="en-IE">
    <head>
      <meta charset="utf-8" />
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      <style type="text/css">${styleTags}</style>
      <script>
        window.API_URL = '${apiUrl}';
        window.CANONICAL_URL = '${canonicalUrl}';
        window.VERSION = '${packageVersion}';
      </script>
    </head>
    <body>
      <div id="root">${reactAppHtml}</div>
      <script type="text/javascript">
        const enableServiceWorker = ${enableServiceWorker ? 'true' : 'false'};

        if ('serviceWorker' in navigator && enableServiceWorker) {
          window.addEventListener('load', () => {
            navigator
              .serviceWorker
              .register('/worker.js')
              .then(registration => {
                console.log('Worker registration succeeded', registration.scope);
              }, error => {
                throw new Error(error);
              })
              .catch(error => {
                console.log('Worker registration failed', error);
              });
          });
        } else {
          console.log('Service worker not supported or disabled');
        }
      </script>
      <script>window._PRELOADED_STATE_ = ${preloadedState};</script>
      <script type="text/javascript" src="/scripts/main.bundle.js"></script>
      <script type="text/javascript" src="/scripts/vendors~main.bundle.js"></script>
    </body>
  </html>
`;
