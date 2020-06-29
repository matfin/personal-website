import { HelmetData } from 'react-helmet';
import {
  colours,
  defaultFont,
  fontSize,
  fontWeight,
  lineHeight,
} from 'app/styles/vars';

export interface IProps {
  apiUrl: string;
  canonicalUrl: string;
  enableServiceWorker: boolean;
  helmet: HelmetData;
  packageVersion?: string;
  preloadedState: string;
  reactAppHtml: string;
  styleTags: string;
}

// https://manytools.org/hacker-tools/ascii-banner/ ANSI Shadow
const banner: string = `
███╗   ███╗ █████╗ ████████╗████████╗    ███████╗██╗███╗   ██╗██╗   ██╗ ██████╗ █████╗ ███╗   ██╗███████╗
████╗ ████║██╔══██╗╚══██╔══╝╚══██╔══╝    ██╔════╝██║████╗  ██║██║   ██║██╔════╝██╔══██╗████╗  ██║██╔════╝
██╔████╔██║███████║   ██║      ██║       █████╗  ██║██╔██╗ ██║██║   ██║██║     ███████║██╔██╗ ██║█████╗
██║╚██╔╝██║██╔══██║   ██║      ██║       ██╔══╝  ██║██║╚██╗██║██║   ██║██║     ██╔══██║██║╚██╗██║██╔══╝
██║ ╚═╝ ██║██║  ██║   ██║      ██║       ██║     ██║██║ ╚████║╚██████╔╝╚██████╗██║  ██║██║ ╚████║███████╗
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝       ╚═╝     ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝
`;

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
      ${styleTags}
      <script>
        window.API_URL = '${apiUrl}';
        window.CANONICAL_URL = '${canonicalUrl}';
        window.VERSION = '${packageVersion}';
      </script>
    </head>
    <body>
      <div id="root">${reactAppHtml}</div>
      <script>
        console.log(\`${banner}\`);
        console.log(\`Version: ${packageVersion}\`);
        console.log('Curious to see how this was built? 👉🏼 https://github.com/matfin/personal-website');
      </script>
      <script>
        const enableServiceWorker = ${enableServiceWorker ? 'true' : 'false'};

        if ('serviceWorker' in navigator && enableServiceWorker) {
          window.addEventListener('load', () => {
            navigator
              .serviceWorker
              .register('/worker.js')
              .then(registration => {
                // console.log('Worker registration succeeded', registration.scope);
              }, error => {
                throw new Error(error);
              })
              .catch(error => {
                console.log('Worker registration failed', error);
              });
          });
        }
      </script>
      <script>window._PRELOADED_STATE_ = ${preloadedState};</script>
      <script src="/scripts/main.bundle.js"></script>
      <script src="/scripts/vendors~main.bundle.js"></script>
    </body>
  </html>
`;

export const unsupported = (): string => `
  <!DOCTYPE html>
  <html lang="en-IE">
    <head>
      <meta charset="utf-8" />
      <title>Matt Finucane - Unsupported browser</title>
      <style type="text/css">
        body {
          background-color: ${colours.secondary};
          font-family: ${defaultFont};
          font-weight: ${fontWeight.light};
          text-align: center;
        }
        .container {
          margin: auto;
          padding: 2rem;
          max-width: 30rem;
          text-align: left;
        }
        h1 {
          font-size: ${fontSize.heading}rem;
          font-weight: ${fontWeight.light};
        }
        h2 {
          font-size: ${fontSize.subheading}rem;
          font-weight: ${fontWeight.light};
        }
        p {
          line-height: ${lineHeight.text}rem;
        }

        a {
          color: ${colours.primary};
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>
          Sorry
        </h1>
        <h2>
          The browser you are using is no longer supported.
        </h2>
        <p>
          I decided to deprecate older browsers such as Internet Explorer because they don't support a lot of the modern technology that delivers better user experiences, and they add more overhead to a project making it harder to get things done.
        </p>
        <p>
          There are <a href="https://bestvpn.org/outdatedbrowser/en" title="modern browsers">more modern browsers</a> you could use for a much better browsing experience.
        </p>
        <p>
          You can still download a copy of my <a href="https://mattfinucane.com/docs/matt-finucane-cv.pdf">CV / Resumé</a> if you wish. Thanks for visiting :)
        </p>
      </h1>
    </body>
  </html>
`;
